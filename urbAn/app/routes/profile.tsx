import { useEffect, useState } from "react";

import { Link } from "react-router";

import { useUser } from "../contexts/userContext.tsx";

import { getProfiles } from "../database/profiles.js";
import { getArchetype } from "../database/archetypes.js";
import { getCompletedRoutesForUser } from "../database/routes.js";
import { getRoute } from "../database/routes.js";

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userAge, setUserAge] = useState(0);

  const { currentUser } = useUser();

  const [primaryArchetypeId, setPrimaryArchetypeId] = useState();
  const [primaryArchetype, setPrimaryArchetype] = useState();

  const [completedRoutes, setCompletedRoutes] = useState([]);

  const calculateAge = (dob) => {
    const dobFormatted = dob.toString().replaceAll("-", "");

    const year = Number(dob.substr(0, 4));
    const month = Number(dob.substr(4, 2)) - 1;
    const day = Number(dob.substr(6, 2));

    const today = new Date();

    let age = today.getFullYear() - year;

    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      age--;
    }

    setUserAge(age);
  };

  const loadProfiles = async () => {
    // const { data, error } = await getProfiles();

    // const user = data?.[1];
    // setProfiles(data);
    // setUser(user);

    if (currentUser?.profile_id) {
      setUserId(currentUser.profile_id);

      const { data: routesData, error } = await getCompletedRoutesForUser(
        currentUser.profile_id,
      );

      let routes = routesData.map((routeData) => routeData.routes);

      setCompletedRoutes(routes);
    }

    calculateAge(currentUser?.date_of_birth);

    if (currentUser?.primary_archetype) {
      const { data: primaryArchetype, error } = await getArchetype(
        currentUser.primary_archetype,
      );
      setPrimaryArchetype(primaryArchetype);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  return (
    <>
      <div className="profile">
        <div className="profile__navigation">
          <Link to={`/home`} className="button--profile">
            back
          </Link>
          <Link to={`/settings`} className="button--profile">
            forward
          </Link>
        </div>
        <div className="profile__info">
          <div className="info__avatar">
            <div className="pfp">pfp</div>
          </div>
          <div className="info__personal">
            <p className="info__name">{currentUser?.name}</p>
            <p className="info__age">{userAge}</p>
          </div>
          <div>
            <div className="info__archetype--primary">
              {primaryArchetype?.title}
            </div>
            <div className="info__archetype--secondary">{}</div>
          </div>
          <div>{currentUser?.description}</div>
        </div>
        <div className="profile__routes">
          <p>Completed routes</p>
          <ul>
            {completedRoutes.map((completedRoute) => (
              <li key={completedRoute.route_id}>{completedRoute.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
