import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Profiles() {
    const [profiles, setProfiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isAddingProfile, setIsAddingProfile] = useState(false);
    const [editingProfileId, setEditingProfileId] = useState(null);
    const [savingProfileId, setSavingProfileId] = useState(null);
    const [newProfile, setNewProfile] = useState({
        name: "",
        email: "",
        date_of_birth: "",
        bio: "",
    });

    useEffect(() => {
        getProfiles();
    }, []);

    async function getProfiles() {
        const { data, error } = await supabase
            .from("profiles")
            .select("*");

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        setProfiles(data);
    }

    function startEditing(profile) {
        setErrorMessage("");
        setIsAddingProfile(false);
        setEditingProfileId(profile.id);
    }

    function cancelEditing() {
        setEditingProfileId(null);
        setErrorMessage("");
    }

    function startAdding() {
        setErrorMessage("");
        setEditingProfileId(null);
        setIsAddingProfile(true);
    }

    function cancelAdding() {
        setIsAddingProfile(false);
        setErrorMessage("");
        setNewProfile({
            name: "",
            email: "",
            date_of_birth: "",
            bio: "",
        });
    }

    function updateNewProfile(field, value) {
        setNewProfile((currentProfile) => ({
            ...currentProfile,
            [field]: value,
        }));
    }

    async function saveProfile(event, profileId) {
        event.preventDefault();
        setSavingProfileId(profileId);
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);

        const payload = {
            name: String(formData.get("name") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim(),
            date_of_birth: String(formData.get("date_of_birth") ?? "") || null,
            bio: String(formData.get("bio") ?? "").trim(),
        };

        const { error } = await supabase
            .from("profiles")
            .update(payload)
            .eq("id", profileId);

        setSavingProfileId(null);

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        await getProfiles();
        cancelEditing();
    }

    async function addProfile(event) {
        event.preventDefault();
        setSavingProfileId("new");
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);

        const payload = {
            name: String(formData.get("name") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim(),
            date_of_birth: String(formData.get("date_of_birth") ?? "") || null,
            bio: String(formData.get("bio") ?? "").trim(),
        };

        const { error } = await supabase.from("profiles").insert([payload]);

        setSavingProfileId(null);

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        await getProfiles();
        cancelAdding();
    }

    async function deleteProfile(profileId) {
        setSavingProfileId(profileId);
        setErrorMessage("");

        const { error } = await supabase
            .from("profiles")
            .delete()
            .eq("id", profileId);

        setSavingProfileId(null);

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        await getProfiles();
    }

    return (
        <div>
            <h1>Profiles</h1>

            <button type="button" onClick={startAdding} disabled={isAddingProfile}>
                Add
            </button>

            {isAddingProfile && (
                <form onSubmit={addProfile} style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={newProfile.name}
                            onChange={(event) => updateNewProfile("name", event.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={newProfile.email}
                            onChange={(event) => updateNewProfile("email", event.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Date of birth
                        <input
                            type="date"
                            name="date_of_birth"
                            value={newProfile.date_of_birth}
                            onChange={(event) =>
                                updateNewProfile("date_of_birth", event.target.value)
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Bio
                        <textarea
                            name="bio"
                            value={newProfile.bio}
                            onChange={(event) => updateNewProfile("bio", event.target.value)}
                        />
                    </label>
                    <br />
                    <button type="submit" disabled={savingProfileId === "new"}>
                        {savingProfileId === "new" ? "Saving..." : "Save"}
                    </button>
                    <button type="button" onClick={cancelAdding} disabled={savingProfileId === "new"}>
                        Cancel
                    </button>
                </form>
            )}

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {profiles.length === 0 && <p>No profiles found.</p>}

            {profiles.map((profile) => (
                <div key={profile.id} style={{ marginBottom: "1rem" }}>
                    {editingProfileId === profile.id ? (
                        <form
                            key={profile.id}
                            onSubmit={(event) => saveProfile(event, profile.id)}
                        >
                            <input type="hidden" name="profileId" value={profile.id} />
                            <label>
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={profile.name ?? ""}
                                />
                            </label>
                            <br />
                            <label>
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={profile.email ?? ""}
                                />
                            </label>
                            <br />
                            <label>
                                Date of birth
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    defaultValue={profile.date_of_birth ?? ""}
                                />
                            </label>
                            <br />
                            <label>
                                Bio
                                <textarea
                                    name="bio"
                                    defaultValue={profile.bio ?? ""}
                                />
                            </label>
                            <br />
                            <button
                                type="submit"
                                disabled={savingProfileId === profile.id}
                                style={{ marginLeft: "0.5rem" }}
                            >
                                {savingProfileId === profile.id ? "Saving..." : "Save"}
                            </button>
                            <button
                                type="button"
                                onClick={cancelEditing}
                                disabled={savingProfileId === profile.id}
                                style={{ marginLeft: "0.5rem" }}
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <>
                            <h2>{profile.name}</h2>
                            <p>{profile.email}</p>
                            <p>{profile.date_of_birth}</p>
                            <p>{profile.bio}</p>
                            <button
                                type="button"
                                onClick={() => startEditing(profile)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => deleteProfile(profile.id)}
                                disabled={savingProfileId === profile.id}
                                style={{ marginLeft: "0.5rem" }}
                            >
                                Delete
                            </button>
                        </>
                    )}
                    <hr />
                </div>
            ))}
        </div>
    );
}