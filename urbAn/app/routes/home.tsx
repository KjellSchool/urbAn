import { Link } from "react-router";
import { Map } from "../components/map";

const Home = () => {
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
          <Link className="social__profile button--social" to={`/profile`} onClick={closeAllTabs}>
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
        <div className="social__section">tadaa left</div>
        <div className="navigation__section">tadaa bottom</div>
      </div>
    </>
  );
};

export default Home;
