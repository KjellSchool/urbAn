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
        if (id !== currentUser.profile_id) {
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
        <button
          className="game__nearby button--social"
          onClick={revealNearbyUsers}>
          <svg
            width="37"
            height="28"
            viewBox="0 0 37 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M16.8527 0H15.5577V1.295H16.8527V0Z" fill="black" />
            <path
              d="M23.3365 3.89265V2.59766H22.0416V3.89265H23.3365Z"
              fill="black"
            />
            <path
              d="M19.4487 10.3711H20.7437V9.0761H19.4487V10.3711Z"
              fill="black"
            />
            <path
              d="M19.4487 12.9648H20.7437V11.6698H19.4487V12.9648Z"
              fill="black"
            />
            <path
              d="M12.9647 6.48625V7.78125H14.2597V6.48625H12.9647Z"
              fill="black"
            />
            <path d="M18.1492 0H16.8542V1.295H18.1492V0Z" fill="black" />
            <path
              d="M28.5209 5.66406H27.226V6.95906H28.5209V5.66406Z"
              fill="black"
            />
            <path
              d="M7.78032 5.66406H9.07532V6.95906H7.78032V5.66406Z"
              fill="black"
            />
            <path
              d="M23.3365 5.18953V3.89453H22.0416V5.18953H23.3365Z"
              fill="black"
            />
            <path
              d="M33.7084 9.5489V8.25391H32.4134V9.5489H33.7084Z"
              fill="black"
            />
            <path
              d="M2.5929 9.5489V8.25391H3.88789V9.5489H2.5929Z"
              fill="black"
            />
            <path
              d="M18.1521 10.3711H19.4471V9.0761H18.1521V10.3711Z"
              fill="black"
            />
            <path
              d="M29.7956 14.7344H31.0906V13.4394H29.7956V14.7344Z"
              fill="black"
            />
            <path
              d="M6.47908 14.7461H5.18408V13.4511H6.47908V14.7461Z"
              fill="black"
            />
            <path
              d="M18.1521 12.9648H19.4471V11.6698H18.1521V12.9648Z"
              fill="black"
            />
            <path
              d="M12.9647 5.18938V6.48438H14.2597V5.18938H12.9647Z"
              fill="black"
            />
            <path
              d="M24.6331 10.8495V12.1445H25.9281V10.8495H24.6331Z"
              fill="black"
            />
            <path
              d="M11.6683 10.8495V12.1445H10.3733V10.8495H11.6683Z"
              fill="black"
            />
            <path d="M19.4456 0H18.1506V1.295H19.4456V0Z" fill="black" />
            <path
              d="M29.8175 5.66406H28.5225V6.95906H29.8175V5.66406Z"
              fill="black"
            />
            <path
              d="M6.48381 5.66406H7.77881V6.95906H6.48381V5.66406Z"
              fill="black"
            />
            <path
              d="M23.3365 6.4825V5.1875H22.0416V6.4825H23.3365Z"
              fill="black"
            />
            <path
              d="M33.7084 10.8458V9.55078H32.4134V10.8458H33.7084Z"
              fill="black"
            />
            <path
              d="M2.5929 10.8458V9.55078H3.88789V10.8458H2.5929Z"
              fill="black"
            />
            <path
              d="M16.8556 10.3711H18.1506V9.0761H16.8556V10.3711Z"
              fill="black"
            />
            <path
              d="M28.4991 14.7344H29.7941V13.4394H28.4991V14.7344Z"
              fill="black"
            />
            <path
              d="M7.77559 14.7461H6.48059V13.4511H7.77559V14.7461Z"
              fill="black"
            />
            <path
              d="M16.8556 12.9648H18.1506V11.6698H16.8556V12.9648Z"
              fill="black"
            />
            <path
              d="M12.9647 3.8925V5.1875H14.2597V3.8925H12.9647Z"
              fill="black"
            />
            <path
              d="M24.6331 9.55266V10.8477H25.9281V9.55266H24.6331Z"
              fill="black"
            />
            <path
              d="M11.6683 9.55266V10.8477H10.3733V9.55266H11.6683Z"
              fill="black"
            />
            <path d="M20.7421 0H19.4471V1.295H20.7421V0Z" fill="black" />
            <path
              d="M31.114 5.66406H29.819V6.95906H31.114V5.66406Z"
              fill="black"
            />
            <path
              d="M5.18743 5.66406H6.48242V6.95906H5.18743V5.66406Z"
              fill="black"
            />
            <path
              d="M23.3365 7.77937V6.48438H22.0416V7.77937H23.3365Z"
              fill="black"
            />
            <path
              d="M33.7084 12.1427V10.8477H32.4134V12.1427H33.7084Z"
              fill="black"
            />
            <path
              d="M2.5929 12.1427V10.8477H3.88789V12.1427H2.5929Z"
              fill="black"
            />
            <path
              d="M15.5593 10.3711H16.8542V9.0761H15.5593V10.3711Z"
              fill="black"
            />
            <path
              d="M27.2026 14.7344H28.4976V13.4394H27.2026V14.7344Z"
              fill="black"
            />
            <path
              d="M9.0721 14.7461H7.7771V13.4511H9.0721V14.7461Z"
              fill="black"
            />
            <path
              d="M15.5593 12.9648H16.8542V11.6698H15.5593V12.9648Z"
              fill="black"
            />
            <path
              d="M12.9647 2.59954V3.89453H14.2597V2.59954H12.9647Z"
              fill="black"
            />
            <path
              d="M24.6331 8.25579V9.55078H25.9281V8.25579H24.6331Z"
              fill="black"
            />
            <path
              d="M11.6683 8.25579V9.55078H10.3733V8.25579H11.6683Z"
              fill="black"
            />
            <path
              d="M22.0386 1.29688H20.7437V2.59187H22.0386V1.29688Z"
              fill="black"
            />
            <path
              d="M32.4105 6.95703H31.1155V8.25203H32.4105V6.95703Z"
              fill="black"
            />
            <path
              d="M3.89092 6.95703H5.18591V8.25203H3.89092V6.95703Z"
              fill="black"
            />
            <path
              d="M22.0402 9.07625V7.78125H20.7452V9.07625H22.0402Z"
              fill="black"
            />
            <path
              d="M32.4119 13.4395V12.1445H31.1169V13.4395H32.4119Z"
              fill="black"
            />
            <path
              d="M3.8894 13.4395V12.1445H5.1844V13.4395H3.8894Z"
              fill="black"
            />
            <path
              d="M22.0402 14.2598V12.9648H20.7452V14.2598H22.0402Z"
              fill="black"
            />
            <path
              d="M23.3365 15.5567V14.2617H22.0416V15.5567H23.3365Z"
              fill="black"
            />
            <path
              d="M12.9647 15.5567V14.2617H14.2597V15.5567H12.9647Z"
              fill="black"
            />
            <path
              d="M24.6331 16.8497V15.5547H23.3381V16.8497H24.6331Z"
              fill="black"
            />
            <path
              d="M11.6683 16.8497V15.5547H12.9633V16.8497H11.6683Z"
              fill="black"
            />
            <path
              d="M25.9296 19.4512V18.1562H24.6346V19.4512H25.9296Z"
              fill="black"
            />
            <path
              d="M35.0049 19.4512V18.1562H33.7099V19.4512H35.0049Z"
              fill="black"
            />
            <path
              d="M1.29651 19.4512V18.1562H2.5915V19.4512H1.29651Z"
              fill="black"
            />
            <path
              d="M10.3718 19.4512V18.1562H11.6668V19.4512H10.3718Z"
              fill="black"
            />
            <path
              d="M27.226 22.0411V20.7461H25.931V22.0411H27.226Z"
              fill="black"
            />
            <path
              d="M36.3013 22.0411V20.7461H35.0063V22.0411H36.3013Z"
              fill="black"
            />
            <path d="M0 22.0411L0 20.7461H1.295V22.0411H0Z" fill="black" />
            <path
              d="M9.07532 22.0411V20.7461H10.3703V22.0411H9.07532Z"
              fill="black"
            />
            <path
              d="M27.226 24.6348V23.3398H25.931V24.6348H27.226Z"
              fill="black"
            />
            <path
              d="M36.3013 24.6348V23.3398H35.0063V24.6348H36.3013Z"
              fill="black"
            />
            <path d="M0 24.6348L0 23.3398H1.295V24.6348H0Z" fill="black" />
            <path
              d="M9.07532 24.6348V23.3398H10.3703V24.6348H9.07532Z"
              fill="black"
            />
            <path
              d="M24.6331 18.1505V16.8555H23.3381V18.1505H24.6331Z"
              fill="black"
            />
            <path
              d="M33.7084 18.1505V16.8555H32.4134V18.1505H33.7084Z"
              fill="black"
            />
            <path
              d="M2.5929 18.1505V16.8555H3.88789V18.1505H2.5929Z"
              fill="black"
            />
            <path
              d="M32.4119 16.8497V15.5547H31.1169V16.8497H32.4119Z"
              fill="black"
            />
            <path
              d="M3.8894 16.8497V15.5547H5.1844V16.8497H3.8894Z"
              fill="black"
            />
            <path
              d="M31.1155 16.8497V15.5547H29.8205V16.8497H31.1155Z"
              fill="black"
            />
            <path
              d="M5.18591 16.8497V15.5547H6.48091V16.8497H5.18591Z"
              fill="black"
            />
            <path
              d="M29.819 16.8497V15.5547H28.524V16.8497H29.819Z"
              fill="black"
            />
            <path
              d="M6.48242 16.8497V15.5547H7.77742V16.8497H6.48242Z"
              fill="black"
            />
            <path
              d="M28.5225 16.8497V15.5547H27.2275V16.8497H28.5225Z"
              fill="black"
            />
            <path
              d="M7.77881 16.8497V15.5547H9.0738V16.8497H7.77881Z"
              fill="black"
            />
            <path
              d="M27.226 16.8497V15.5547H25.931V16.8497H27.226Z"
              fill="black"
            />
            <path
              d="M9.07532 16.8497V15.5547H10.3703V16.8497H9.07532Z"
              fill="black"
            />
            <path
              d="M28.5225 20.7403V19.4453H27.2275V20.7403H28.5225Z"
              fill="black"
            />
            <path
              d="M7.77881 20.7403V19.4453H9.0738V20.7403H7.77881Z"
              fill="black"
            />
            <path
              d="M29.819 23.338V22.043H28.524V23.338H29.819Z"
              fill="black"
            />
            <path
              d="M6.48242 23.338V22.043H7.77742V23.338H6.48242Z"
              fill="black"
            />
            <path
              d="M29.819 25.9317V24.6367H28.524V25.9317H29.819Z"
              fill="black"
            />
            <path
              d="M6.48242 25.9317V24.6367H7.77742V25.9317H6.48242Z"
              fill="black"
            />
            <path
              d="M27.226 18.1505V16.8555H25.931V18.1505H27.226Z"
              fill="black"
            />
            <path
              d="M9.07532 18.1505V16.8555H10.3703V18.1505H9.07532Z"
              fill="black"
            />
            <path
              d="M28.5225 19.4512V18.1562H27.2275V19.4512H28.5225Z"
              fill="black"
            />
            <path
              d="M7.77881 19.4512V18.1562H9.0738V19.4512H7.77881Z"
              fill="black"
            />
            <path
              d="M29.819 22.0411V20.7461H28.524V22.0411H29.819Z"
              fill="black"
            />
            <path
              d="M6.48242 22.0411V20.7461H7.77742V22.0411H6.48242Z"
              fill="black"
            />
            <path
              d="M29.819 24.6348V23.3398H28.524V24.6348H29.819Z"
              fill="black"
            />
            <path
              d="M6.48242 24.6348V23.3398H7.77742V24.6348H6.48242Z"
              fill="black"
            />
            <path
              d="M11.6683 18.1505V16.8555H12.9633V18.1505H11.6683Z"
              fill="black"
            />
            <path
              d="M25.9296 20.7403V19.4453H24.6346V20.7403H25.9296Z"
              fill="black"
            />
            <path
              d="M35.0049 20.7403V19.4453H33.7099V20.7403H35.0049Z"
              fill="black"
            />
            <path
              d="M1.29651 20.7403V19.4453H2.5915V20.7403H1.29651Z"
              fill="black"
            />
            <path
              d="M10.3718 20.7403V19.4453H11.6668V20.7403H10.3718Z"
              fill="black"
            />
            <path
              d="M27.226 23.338V22.043H25.931V23.338H27.226Z"
              fill="black"
            />
            <path
              d="M36.3013 23.338V22.043H35.0063V23.338H36.3013Z"
              fill="black"
            />
            <path d="M0 23.338L0 22.043H1.295V23.338H0Z" fill="black" />
            <path
              d="M9.07532 23.338V22.043H10.3703V23.338H9.07532Z"
              fill="black"
            />
            <path
              d="M27.226 25.9317V24.6367H25.931V25.9317H27.226Z"
              fill="black"
            />
            <path
              d="M36.3013 25.9317V24.6367H35.0063V25.9317H36.3013Z"
              fill="black"
            />
            <path d="M0 25.9317L0 24.6367H1.295V25.9317H0Z" fill="black" />
            <path
              d="M9.07532 25.9317V24.6367H10.3703V25.9317H9.07532Z"
              fill="black"
            />
            <path
              d="M27.226 27.2247V25.9297H25.931V27.2247H27.226Z"
              fill="black"
            />
            <path
              d="M36.3013 27.2247V25.9297H35.0063V27.2247H36.3013Z"
              fill="black"
            />
            <path d="M0 27.2247L0 25.9297H1.295V27.2247H0Z" fill="black" />
            <path
              d="M25.9296 27.2247V25.9297H24.6346V27.2247H25.9296Z"
              fill="black"
            />
            <path
              d="M35.0049 27.2247V25.9297H33.7099V27.2247H35.0049Z"
              fill="black"
            />
            <path
              d="M1.29651 27.2247V25.9297H2.5915V27.2247H1.29651Z"
              fill="black"
            />
            <path
              d="M24.6331 27.2247V25.9297H23.3381V27.2247H24.6331Z"
              fill="black"
            />
            <path
              d="M33.7084 27.2247V25.9297H32.4134V27.2247H33.7084Z"
              fill="black"
            />
            <path
              d="M2.5929 27.2247V25.9297H3.88789V27.2247H2.5929Z"
              fill="black"
            />
            <path
              d="M23.3365 27.2247V25.9297H22.0416V27.2247H23.3365Z"
              fill="black"
            />
            <path
              d="M32.4119 27.2247V25.9297H31.1169V27.2247H32.4119Z"
              fill="black"
            />
            <path
              d="M3.8894 27.2247V25.9297H5.1844V27.2247H3.8894Z"
              fill="black"
            />
            <path
              d="M31.1155 27.2247V25.9297H29.8205V27.2247H31.1155Z"
              fill="black"
            />
            <path
              d="M5.18591 27.2247V25.9297H6.48091V27.2247H5.18591Z"
              fill="black"
            />
            <path
              d="M29.819 27.2247V25.9297H28.524V27.2247H29.819Z"
              fill="black"
            />
            <path
              d="M6.48242 27.2247V25.9297H7.77742V27.2247H6.48242Z"
              fill="black"
            />
            <path
              d="M22.0402 27.2247V25.9297H20.7452V27.2247H22.0402Z"
              fill="black"
            />
            <path
              d="M20.7437 27.2247V25.9297H19.4487V27.2247H20.7437Z"
              fill="black"
            />
            <path
              d="M19.4471 27.2247V25.9297H18.1521V27.2247H19.4471Z"
              fill="black"
            />
            <path
              d="M18.1506 27.2247V25.9297H16.8556V27.2247H18.1506Z"
              fill="black"
            />
            <path
              d="M16.8542 27.2247V25.9297H15.5593V27.2247H16.8542Z"
              fill="black"
            />
            <path
              d="M15.5577 27.2247V25.9297H14.2627V27.2247H15.5577Z"
              fill="black"
            />
            <path
              d="M14.2612 27.2247V25.9297H12.9662V27.2247H14.2612Z"
              fill="black"
            />
            <path
              d="M12.9647 27.2247V25.9297H11.6697V27.2247H12.9647Z"
              fill="black"
            />
            <path
              d="M11.6683 27.2247V25.9297H10.3733V27.2247H11.6683Z"
              fill="black"
            />
            <path
              d="M10.3718 27.2247V25.9297H9.07683V27.2247H10.3718Z"
              fill="black"
            />
            <path
              d="M14.2627 9.07812H15.5577V7.78313H14.2627V9.07812Z"
              fill="black"
            />
            <path
              d="M25.9061 13.4414H27.201V12.1464H25.9061V13.4414Z"
              fill="black"
            />
            <path
              d="M10.3675 13.4531H8.74622V12.1497H10.3675V13.4531Z"
              fill="black"
            />
            <path
              d="M14.2627 14.2617H15.5577V12.9667H14.2627V14.2617Z"
              fill="black"
            />
            <path
              d="M14.2612 1.30266V2.59766H15.5562V1.30266H14.2612Z"
              fill="black"
            />
            <path
              d="M25.9296 6.95891V8.25391H27.2246V6.95891H25.9296Z"
              fill="black"
            />
            <path
              d="M10.3682 6.97058V8.24219H8.65149V6.97058H10.3682Z"
              fill="black"
            />
            <rect
              x="2.60791"
              y="8.24219"
              width="9.06341"
              height="3.91158"
              fill="black"
            />
            <rect
              x="9.06421"
              y="6.29688"
              width="7.82315"
              height="3.87977"
              transform="rotate(90 9.06421 6.29688)"
              fill="black"
            />
            <path
              d="M26.9382 13.1239L27.606 13.9349L30.7706 13.8077L32.0586 12.4083L32.8696 11.8199L32.6629 8.59182L31.8996 7.55818L30.4525 6.46094L27.5265 6.60406L26.4929 7.81262L25.4434 8.62362L25.6024 11.8359L26.9382 13.1239Z"
              fill="black"
            />
            <path
              d="M0.57251 21.3119V26.6073L7.21959 26.3847L7.44222 21.0734L8.30094 20.2623L8.71439 18.3859L9.71622 17.7816L9.35048 16.1914L4.15048 16.5731L3.18046 17.6544L1.84468 18.7675L1.71746 20.4214L0.57251 21.3119Z"
              fill="black"
            />
            <path
              d="M35.7321 21.2806V26.576L29.085 26.3534L28.8623 21.0421L28.0036 20.2311L27.5902 18.3546L26.5883 17.7504L26.9541 16.1602L32.1541 16.5418L33.1241 17.6232L34.4599 18.7363L34.5871 20.3901L35.7321 21.2806Z"
              fill="black"
            />
          </svg>
        </button>
        <Link
          className="social__profile button--social"
          to={`/profile`}
          onClick={closeAllTabs}>
          {currentUser?.name}
        </Link>
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
          <button className="" onClick={revealRoutes}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
