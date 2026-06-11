import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useUser } from "../contexts/userContext.tsx";
import { getProfiles, getProfile } from "../database/profiles.js";

const User = () => {
  const { setCurrentUser } = useUser();

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
    console.log(profileId);
    const { data: profile, error } = await getProfile(profileId);
    console.log(profile);
    setSelectedUser(profile);
    setCurrentUser(profile);
  };

  return (
    <>
      <div className="selector">
        <h1 className="selector__title">First time in Antwerp?</h1>
        <div className="selector__question">
          <p>
            If you already created a profile, please select it.
          </p>
          <div className="selector__users">
            <ul className="users__list">
              {profiles.map((profile) => (
                <Link to={`/home`} key={profile.profile_id}>
                  <li className="users__item">
                    <button onClick={() => selectUser(profile.profile_id)}>
                      {profile.name} pfp
                    </button>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="selector__question">
          <p>
            If you don't have a profile yet, take the Archetype quiz.
          </p>
          <Link className="selector__onboarding" to={`/question-1`}>My Side of Antwerp</Link>
        </div>
      </div>
    </>
  );
};

export default User;
