import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Map } from "../components/map";

import { useUser } from "../contexts/userContext.tsx";

import { getProfiles } from "../database/profiles.js";

import { getRoutes } from "../database/routes.js";

const Home = () => {
  const { currentUser } = useUser();

  const [profiles, setProfiles] = useState([]);
  const [routes, setRoutes] = useState([]);

  const loadProfiles = async () => {
    const { data: profiles, error } = await getProfiles();
    setProfiles(profiles);
  }

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

  useEffect(() => {
    loadProfiles();
    loadRoutes();
  }, []);

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
            🚏
          </button>
        </div>
        <div className="social__section">
          <ul className="social__nearby">
            {
              profiles?.map((profile) => {
                if (profile?.profile_id !== currentUser?.profile_id) {
                  return (
                    <Link to={``}>
                      <li className="nearby__user" key={profile?.profile_id}>
                        <div className="nearby__info">
                          <div className="nearby__avater">pfp</div>
                          <div>
                            <p className="nearby__name">{profile?.name}</p>
                            <p>archetype</p>
                          </div>
                        </div>
                        <p>{profile?.description}</p>
                        <p className="nearby__routes">Has completed <span>X</span> routes</p>
                        <button className="nearby__meet">Ask to meet up</button>
                      </li>
                    </Link>
                  )
                }
              })
            }
          </ul>
        </div>
        <div className="navigation__section">
          <ul className="routes__list">
            {routes?.map((route) => (
              <Link to={`?route=${route?.route_id}`} key={route?.route_id}>
                <li className="routes__item">
                  <h2 className="route__title">{route?.title}</h2>
                  <div className="route__info">Archetype <p className="route__distance">{route?.distance}</p></div>
                  <p className="route__description">{route?.description}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
