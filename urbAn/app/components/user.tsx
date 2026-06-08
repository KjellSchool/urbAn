import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getProfiles, getProfile } from "../database/profiles.js";

const User = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadProfiles = async () => {
    const { data: profiles, error } = await getProfiles();
    setProfiles(profiles);
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  const selectUser = async (profileId) => {
    const {data: profile, error } = await getProfile(profileId);
    console.log(profile);
    setSelectedUser(profile);
  }

  return (
    <>
      <h1>First time in Antwerp?</h1>
      <div>
        <p>If you already created a profile, please select it.</p>
        <div>
          <ul>
            {profiles.map((profile) => (
              // <Link to={``}>
                <li key={profile.profile_id}><button onClick={() => selectUser(profile.profile_id)}>{profile.name}</button></li>
              // </Link>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p>If you don't have a profile yet, take the Archetype quiz.</p>
        <Link to={`firstQuestion`}>My Side of Antwerp</Link>
      </div>
    </>
  );
};

export default User;
