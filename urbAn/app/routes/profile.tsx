import { useEffect, useState } from "react";

import { Link } from "react-router";
import { getProfiles } from "../database/profiles.js";
import { getArchetype } from "../database/archetypes.js";
import { getCompletedRoutesForUser } from "../database/routes.js";
import { getRoute } from "../database/routes.js";

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userAge, setUserAge] = useState(0);

  const [primaryArchetypeId, setPrimaryArchetypeId] = useState();
  const [primaryArchetype, setPrimaryArchetype] = useState();

  const [completedRoutes, setCompletedRoutes] = useState([]);

  const calculateAge = (dob) => {
    const dobFormatted = dob.toString().replaceAll("-", "");

    const year = Number(dob.substr(0, 4));
    const month = Number(dob.substr(4, 2)) - 1;
    const day = Number(dob.substr(6, 2));

    const today = new Date();

    const age = today.getFullYear() - year;

    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      age--;
    }

    setUserAge(age);
  };

  const loadProfiles = async () => {
    const { data, error } = await getProfiles();

    const user = data?.[1];
    setProfiles(data);
    setUser(user);

    if (user?.profile_id) {
      setUserId(user.profile_id);

      const { data: routesData, error } = await getCompletedRoutesForUser(
        user.profile_id,
      );

      let routes = routesData.map((routeData) => routeData.routes);

      setCompletedRoutes(routes);
    }

    calculateAge(user?.date_of_birth);

    if (user?.primary_archetype) {
      const { data: primaryArchetype, error } = await getArchetype(
        user.primary_archetype,
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
          <Link to={`/`} className="button--profile">
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
            <p className="info__name">{user?.name}</p>
            <p className="info__age">{userAge}</p>
          </div>
          <div>
            <div className="info__archetype--primary">
              {primaryArchetype?.title}
            </div>
            <div className="info__archetype--secondary">{}</div>
          </div>
          <div>{user?.description}</div>
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
