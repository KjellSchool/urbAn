import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Map } from "../components/map";

import { useUser } from "../contexts/userContext.tsx";

import { getProfiles } from "../database/profiles.js";
import { getRoutes } from "../database/routes.js";
import { getArchetype } from "../database/archetypes.js";

const Home = () => {
  const { currentUser } = useUser();

  const [profiles, setProfiles] = useState([]);
  const [routes, setRoutes] = useState([]);

  const loadProfiles = async () => {
    const { data: profiles, error } = await getProfiles();
    setProfiles(profiles);
  };

  const revealRoutes = () => {
    const $section = document.querySelector(".navigation__section");

    const $otherSection = document.querySelector(".social__section");

    if ($otherSection?.classList.contains("social__section--active")) {
      $otherSection.classList.remove("social__section--active");
    }

    $section?.classList.toggle("navigation__section--active");
  };

  const revealNearbyUsers = () => {
    const $section = document.querySelector(".social__section");

    const $otherSection = document.querySelector(".navigation__section");

    if ($otherSection?.classList.contains("navigation__section--active")) {
      $otherSection.classList.remove("navigation__section--active");
    }
    $section?.classList.toggle("social__section--active");
  };

  const closeAllTabs = () => {
    const $nearbySection = document.querySelector(".social__section");
    const $routesSection = document.querySelector(".navigation__section");

    $nearbySection?.classList.remove("social__section--active");
    $routesSection?.classList.remove("navigation__section--active");
  };

  const loadRoutes = async () => {
    const { data: routes, error } = await getRoutes();
    setRoutes(routes);
  };

  const [archetypes, setArchetypes] = useState({});

  const loadProfileArchetype = async (archetypeId) => {
    const archetypeIdList = [
      ...new Set(profiles.map((profile) => profile.primary_archetype)),
    ];

    const results = await Promise.all(
      archetypeIdList.map(async (id) => {
        if ( id !== currentUser.profile_id) {
          const { data } = await getArchetype(id);
          return [id, data?.title];
        }
      }),
    );

    setArchetypes(Object.fromEntries(results));
  };

  useEffect(() => {
    loadProfiles();
    loadRoutes();
  }, []);

  useEffect(() => {
    if (profiles.length > 0) {
      loadProfileArchetype();
    }
  }, [profiles]);

  return (
    <>
      <div className="game">
        <div className="game__map">
          <Map />
        </div>
        <div className="game__social">
          <button
            className="social__nearby button--social"
            onClick={revealNearbyUsers}>
            👤
          </button>
          <Link
            className="social__profile button--social"
            to={`/profile`}
            onClick={closeAllTabs}>
            👋🏼
          </Link>
        </div>
        <div className="game__navigation">
          <button
            className="navigation__routes button--navigation"
            onClick={revealRoutes}>
            <svg
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M19.499 18H17.9991V19.4999H19.499V18Z" fill="black" />
              <path
                d="M20.9989 19.5H19.499V20.9999H20.9989V19.5Z"
                fill="black"
              />
              <path d="M19.499 15H17.9991V16.4999H19.499V15Z" fill="black" />
              <path d="M17.9991 15H16.4992V16.4999H17.9991V15Z" fill="black" />
              <path d="M16.4992 15H14.9992V16.4999H16.4992V15Z" fill="black" />
              <path
                d="M16.4992 13.5H14.9992V14.9999H16.4992V13.5Z"
                fill="black"
              />
              <path
                d="M17.9991 13.5H16.4992V14.9999H17.9991V13.5Z"
                fill="black"
              />
              <path
                d="M17.9991 16.5H16.4992V17.9999H17.9991V16.5Z"
                fill="black"
              />
              <path
                d="M19.499 16.5H17.9991V17.9999H19.499V16.5Z"
                fill="black"
              />
              <path d="M20.9989 18H19.499V19.4999H20.9989V18Z" fill="black" />
              <path
                d="M20.9989 16.5H19.499V17.9999H20.9989V16.5Z"
                fill="black"
              />
              <path d="M22.4989 18H20.9989V19.4999H22.4989V18Z" fill="black" />
              <path
                d="M22.4989 19.5H20.9989V20.9999H22.4989V19.5Z"
                fill="black"
              />
              <path
                d="M13.4993 13.5H11.9994V14.9999H13.4993V13.5Z"
                fill="black"
              />
              <path d="M16.4992 12H14.9992V13.4999H16.4992V12Z" fill="black" />
              <path
                d="M16.4992 10.5H14.9992V11.9999H16.4992V10.5Z"
                fill="black"
              />
              <path d="M17.9991 9H16.4992V10.4999H17.9991V9Z" fill="black" />
              <path
                d="M17.9991 7.5H16.4992V8.99992H17.9991V7.5Z"
                fill="black"
              />
              <path d="M17.9991 6H16.4992V7.49992H17.9991V6Z" fill="black" />
              <path
                d="M14.9992 1.5H13.4993V2.99992H14.9992V1.5Z"
                fill="black"
              />
              <path
                d="M13.4993 1.5H11.9994V2.99992H13.4993V1.5Z"
                fill="black"
              />
              <path
                d="M11.9994 3.75H10.4995V5.24992H11.9994V3.75Z"
                fill="black"
              />
              <path
                d="M13.4993 5.25H11.9994V6.74992H13.4993V5.25Z"
                fill="black"
              />
              <path
                d="M13.4993 6.75H11.9994V8.24992H13.4993V6.75Z"
                fill="black"
              />
              <path d="M11.9994 0H10.4995V1.49992H11.9994V0Z" fill="black" />
              <path d="M10.4995 0H8.99954V1.49992H10.4995V0Z" fill="black" />
              <path d="M8.99956 0H7.49963V1.49992H8.99956V0Z" fill="black" />
              <path d="M7.49962 0H5.99969V1.49992H7.49962V0Z" fill="black" />
              <path
                d="M5.99968 1.5H4.49976V2.99992H5.99968V1.5Z"
                fill="black"
              />
              <path
                d="M2.99985 5.99992V4.5H1.49992V5.99992H2.99985Z"
                fill="black"
              />
              <path
                d="M16.4992 5.99992V4.5H14.9993V5.99992H16.4992Z"
                fill="black"
              />
              <path
                d="M4.49977 1.5H2.99985V2.99992H4.49977V1.5Z"
                fill="black"
              />
              <path
                d="M2.99985 4.49992V3H1.49992V4.49992H2.99985Z"
                fill="black"
              />
              <path
                d="M16.4992 4.49992V3H14.9993V4.49992H16.4992Z"
                fill="black"
              />
              <path d="M1.49992 6H0V7.49992H1.49992V6Z" fill="black" />
              <path d="M1.49992 7.5H0V8.99992H1.49992V7.5Z" fill="black" />
              <path d="M1.49992 9H0V10.4999H1.49992V9Z" fill="black" />
              <path
                d="M2.99983 10.5H1.49991V11.9999H2.99983V10.5Z"
                fill="black"
              />
              <path d="M2.99983 12H1.49991V13.4999H2.99983V12Z" fill="black" />
              <path
                d="M4.49977 13.5H2.99985V14.9999H4.49977V13.5Z"
                fill="black"
              />
              <path
                d="M5.99968 13.5H4.49976V14.9999H5.99968V13.5Z"
                fill="black"
              />
              <path d="M7.49962 15H5.99969V16.4999H7.49962V15Z" fill="black" />
              <path d="M8.99956 15H7.49963V16.4999H8.99956V15Z" fill="black" />
              <path d="M10.4995 15H8.99954V16.4999H10.4995V15Z" fill="black" />
              <path d="M11.9994 15H10.4995V16.4999H11.9994V15Z" fill="black" />
              <path
                d="M14.9992 13.5H13.4993V14.9999H14.9992V13.5Z"
                fill="black"
              />
            </svg>
            Look for routes
          </button>
        </div>
        <div className="social__section">
          <ul className="social__nearby">
            {profiles?.map((profile) => {
              if (profile?.profile_id !== currentUser?.profile_id) {
                return (
                  <li className="nearby__user" key={profile?.profile_id}>
                    <div className="nearby__info">
                      <div className="nearby__avater">pfp</div>
                      <div>
                        <p className="nearby__name">{profile?.name}</p>
                        <p>{archetypes[profile?.primary_archetype]}</p>
                      </div>
                    </div>
                    <p>{profile?.description}</p>
                    <p className="nearby__routes">
                      Has completed <span>X</span> routes
                    </p>
                    <button className="nearby__meet">Ask to meet up</button>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="navigation__section">
          <ul className="routes__list">
            {routes?.map((route) => (
              <Link to={`?route=${route?.route_id}`} key={route?.route_id}>
                <button onClick={closeAllTabs}>
                  <li className="routes__item">
                    <h2 className="route__title">{route?.title}</h2>
                    <div className="route__info">
                      Archetype{" "}
                      <p className="route__distance">{route?.distance}</p>
                    </div>
                    <p className="route__description">{route?.description}</p>
                  </li>
                </button>
              </Link>
            ))}
          </ul>
          <Link to={`/home`}>Cancel routes</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
