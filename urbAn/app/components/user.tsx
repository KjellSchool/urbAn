import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useUser } from "../contexts/userContext.tsx";
import { getProfiles, getProfile } from "../database/profiles.js";

const User = () => {
  const navigate = useNavigate();

  const { setCurrentUser } = useUser();

  const [profiles, setProfiles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const avatarColors = [
    "#ff8029",
    "#cdff10",
    "#00e081",
    "#46a2ff",
    "#b085ff",
  ];

  const randomColor =
    avatarColors[Math.floor(Math.random() * avatarColors.length)];

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

    navigate("/home");
  };

  return (
    <>
      <div className="selector">
        <h1 className="selector__title">Who's there?</h1>
        <p className="selector__description">
          <span className="highlight-blue-100">Select or create your</span>
          <span className="highlight-blue-100">own profile</span>
        </p>
        <ul className="selector__users">
          {profiles.map((profile) => (
            <li className="users__item" key={profile.profile_id}>
              <button onClick={() => selectUser(profile.profile_id)}>
                <img
                  className="user__avatar"
                  src={profile?.avatar}
                  alt="avatar"
                  style={{
                    backgroundColor:
                      avatarColors[Math.floor(Math.random() * avatarColors.length)],
                  }}
                />
                <p className="user__name">
                  {profile?.name ? profile?.name : "boring"}
                </p>
              </button>
            </li>
          ))}
          <li className="users__create">
            <Link className="selector__onboarding" to={`/question-1`}>
              <svg
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M35.9944 13.8769C36.7061 13.8769 37.2896 14.1188 37.745 14.6027C38.2005 15.0866 38.4282 15.6702 38.4282 16.3533V22.0749C38.4282 22.758 38.2005 23.3416 37.745 23.8255C37.2896 24.3094 36.7061 24.5514 35.9944 24.5514H24.5514V35.9944C24.5514 36.6776 24.3094 37.2611 23.8255 37.745C23.3416 38.2005 22.758 38.4282 22.0749 38.4282H16.3533C15.6702 38.4282 15.0866 38.2005 14.6027 37.745C14.1188 37.2611 13.8769 36.6776 13.8769 35.9944V24.5514H2.43379C1.75062 24.5514 1.16708 24.3094 0.683168 23.8255C0.227723 23.3416 0 22.758 0 22.0749V16.3533C0 15.6702 0.227723 15.0866 0.683168 14.6027C1.16708 14.1188 1.75062 13.8769 2.43379 13.8769H13.8769V2.43379C13.8769 1.72215 14.1188 1.13861 14.6027 0.683168C15.0866 0.227723 15.6702 0 16.3533 0H22.0749C22.758 0 23.3416 0.227723 23.8255 0.683168C24.3094 1.13861 24.5514 1.72215 24.5514 2.43379V13.8769H35.9944Z"
                  fill="#A8DAFF"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default User;
