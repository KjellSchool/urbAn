import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Map } from "../components/map";

import { useUser } from "../contexts/userContext.tsx";

import { supabase } from "../database/supabase.js";

import { getProfiles, getProfile } from "../database/profiles.js";
import { getProfileLocation } from "../database/profiles.js";

import { getRoutes } from "../database/routes.js";
import { getArchetype } from "../database/archetypes.js";

import {
  sendRequest,
  getPendingRequests,
  subscribeToRequests,
  setMeetupStatus,
} from "../database/meetup.js";

import {
  insertChallengeProgres,
  getChallengeProgress,
} from "../database/challenges.js";

import { getChallengeTip } from "../database/tips.js";

import tumbleweed from "../assets/icons/tumbleweed.svg";

const Home = () => {
  const { currentUser } = useUser();
  const [profileLocation, setProfileLocation] = useState(
    currentUser?.coordinates,
  );

  const [profiles, setProfiles] = useState([]);
  const [closeProfiles, setCloseProfiles] = useState([]);
  const [farProfiles, setFarProfiles] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [activeRoute, setActiveRoute] = useState(null);
  const [routeLocations, setRouteLocations] = useState([]);
  const [routeChallenges, setRouteChallenges] = useState([]);
  const [challengeTip, setChallengeTip] = useState(null);
  const [tipActive, setTipActive] = useState(false);

  const [pendingMeetRequests, setPendingMeetRequests] = useState([]);
  const [senderProfile, setSenderProfile] = useState(null);
  const [senderArchetype, setSenderArchetype] = useState(null);
  const [meetinInterest, setMeetingInterest] = useState(false);

  const getCurrentUserLocation = async () => {
    const { data: location } = await getProfileLocation(
      currentUser?.profile_id,
    );
    setProfileLocation(location);
  };

  const calculateDistance = (user1Coords, user2Coords) => {
    if (
      !Array.isArray(user1Coords) ||
      !Array.isArray(user2Coords?.coordinates)
    ) {
      return null;
    }

    const [lat1, lon1] = user1Coords || [0, 0];
    const [lat2, lon2] = user2Coords?.coordinates || [0, 0];

    const R = 6371; // Earth's radius in km

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c * 1000;
  };

  const groupProfiles = (users) => {
    if (!users) return;

    let newClose = [];
    let newFar = [];

    users.map((user) => {
      if (user.profile_id !== currentUser?.profile_id) {
        const userCoords = user?.coordinates;
        const userDistance = calculateDistance(userCoords, profileLocation);

        if (userDistance < 200) {
          newClose.push(user);
        } else if (userDistance < 500) {
          newFar.push(user);
        }
      }
    });

    setCloseProfiles(newClose);
    setFarProfiles(newFar);
  };

  const loadProfiles = async () => {
    const { data: profiles, error } = await getProfiles();
    setProfiles(profiles);
  };

  const moveTabs = () => {
    const $sectionButton = document.querySelector(".game__buttons");
    const $routesSection = document.querySelector(".navigation__section");
    const $nearbySection = document.querySelector(".social__section");
    const $challengesSection = document.querySelector(".challenges__section");

    const isActive =
      $routesSection?.classList.contains("navigation__section--active") ||
      $nearbySection?.classList.contains("social__section--active") ||
      $challengesSection?.classList.contains("challenges__section--active");

    $sectionButton?.classList.toggle("game__buttons--active", isActive);
  };

  const revealRoutes = () => {
    const $routesSection = document.querySelector(".navigation__section");
    const $nearbySection = document.querySelector(".social__section");
    const $challengesSection = document.querySelector(".challenges__section");

    $routesSection?.classList.toggle("navigation__section--active");
    $nearbySection?.classList.remove("social__section--active");
    $challengesSection?.classList.remove("challenges__section--active");

    moveTabs();
  };

  const revealNearbyUsers = () => {
    const $nearbySection = document.querySelector(".social__section");
    const $routesSection = document.querySelector(".navigation__section");
    const $challengesSection = document.querySelector(".challenges__section");

    $nearbySection?.classList.toggle("social__section--active");
    $routesSection?.classList.remove("navigation__section--active");
    $challengesSection?.classList.remove("challenges__section--active");

    moveTabs();
  };

  const revealChallenges = () => {
    const $challengesSection = document.querySelector(".challenges__section");
    const $nearbySection = document.querySelector(".social__section");
    const $routesSection = document.querySelector(".navigation__section");

    $challengesSection?.classList.toggle("challenges__section--active");
    $nearbySection?.classList.remove("social__section--active");
    $routesSection?.classList.remove("navigation__section--active");

    moveTabs();
  };

  const closeAllTabs = () => {
    const $nearbySection = document.querySelector(".social__section");
    const $routesSection = document.querySelector(".navigation__section");
    const $sectionButton = document.querySelector(".game__buttons");
    const $challengesSection = document.querySelector(".challenges__section");

    $nearbySection?.classList.remove("social__section--active");
    $routesSection?.classList.remove("navigation__section--active");
    $sectionButton?.classList.remove("game__buttons--active");
    $challengesSection?.classList.remove("challenges__section--active");
  };

  const loadRoutes = async () => {
    const { data: routes, error } = await getRoutes();
    setRoutes(routes);
  };

  const [routeArchetypes, setRouteArchetypes] = useState([]);

  const loadRouteArchetypes = async (archetypeId) => {
    const archetypeList = [
      ...new Set(routes.map((route) => route.archetypes[0])),
    ];

    const result = await Promise.all(
      archetypeList.map(async (id) => {
        const { data } = await getArchetype(id);
        return [id, data];
      }),
    );

    setRouteArchetypes(Object.fromEntries(result));
  };

  const [profileArchetypes, setProfileArchetypes] = useState({});

  const loadProfileArchetype = async (archetypeId) => {
    const archetypeIdList = [
      ...new Set(profiles.map((profile) => profile.primary_archetype)),
    ];

    const results = await Promise.all(
      archetypeIdList.map(async (id) => {
        if (id !== currentUser?.profile_id) {
          const { data } = await getArchetype(id);
          return [id, data];
        }
      }),
    );

    setProfileArchetypes(Object.fromEntries(results));
  };

  useEffect(() => {
    if (!currentUser?.profile_id) return;
    getCurrentUserLocation();
    loadProfiles();
    loadRoutes();

    const loadProfilesInterval = setInterval(() => {
      getCurrentUserLocation();
      loadProfiles();
    }, 5_000);

    return () => clearInterval(loadProfilesInterval);
  }, [currentUser]);

  useEffect(() => {
    if (profiles.length > 0) {
      loadRouteArchetypes();
      loadProfileArchetype();

      if (profiles.length > 0 && profileLocation?.coordinates) {
        groupProfiles(profiles);
      }

      const groupingInterval = setInterval(() => {
        if (profiles.length > 0 && profileLocation?.coordinates) {
          groupProfiles(profiles);
        }
      }, 5_000);

      return () => clearInterval(groupingInterval);
    }
  }, [profiles]);

  const sendMeetRequest = async (receiverId) => {
    const { data: sentRequest, error } = await sendRequest(
      currentUser?.profile_id,
      receiverId,
    );
  };

  const loadPendingMeetRequests = async () => {
    const { data: pendingRequests, error } = await getPendingRequests(
      currentUser?.profile_id,
    );

    setPendingMeetRequests(pendingRequests);
  };

  const loadSenderProfile = async () => {
    const pendingRequest = pendingMeetRequests.find(
      (request) => request.status === "pending",
    );

    if (!pendingRequest) return;

    const { data: profile } = await getProfile(pendingRequest.sender_id);
    setSenderProfile(profile);

    const { data: archetype } = await getArchetype(profile?.primary_archetype);
    setSenderArchetype(archetype);
  };

  useEffect(() => {
    if (!currentUser) return;

    loadPendingMeetRequests();

    const channel = subscribeToRequests(
      currentUser?.profile_id,
      (freshMeet) => {
        setPendingMeetRequests((prev) => {
          const exists = prev.find((r) => r.meet_id === freshMeet.meet_id);

          if (exists) {
            return prev.map((r) =>
              r.meet_id === freshMeet.meet_id ? freshMeet : r,
            );
          }

          return [...prev, freshMeet];
        });
      },
    );

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  useEffect(() => {
    loadSenderProfile();
  }, [pendingMeetRequests]);

  const updateMeetupStatus = async (meetupId, status) => {
    const request = pendingMeetRequests.find((r) => r.meet_id === meetupId);

    if (!request) return;

    // optimistic UI update (optional but good UX)
    setPendingMeetRequests((prev) =>
      prev.map((r) => (r.meet_id === meetupId ? { ...r, status } : r)),
    );

    let updatePayload = { status };

    if (status === "accepted") {
      const { data: sender } = await getProfile(request.sender_id);
      const { data: receiver } = await getProfile(request.receiver_id);

      if (!sender?.coordinates || !receiver?.coordinates) {
        console.error("Missing coordinates");
        return;
      }

      const senderCoords = sender.coordinates; // [lat, lng]
      const receiverCoords = receiver.coordinates;

      const middle = [
        (senderCoords[0] + receiverCoords[0]) / 2,
        (senderCoords[1] + receiverCoords[1]) / 2,
      ];

      updatePayload.location = middle; // [lat, lng]
    }

    const { data: freshMeet, error } = await supabase
      .from("meet_requests")
      .update(updatePayload)
      .eq("meet_id", meetupId)
      .select()
      .single();

    setPendingMeetRequests((prev) => {
      const exists = prev.find((r) => r.meet_id === freshMeet.meet_id);

      if (exists) {
        return prev.map((r) =>
          r.meet_id === freshMeet.meet_id ? freshMeet : r,
        );
      }

      return [...prev, freshMeet];
    });

    setMeetingInterest(false);
  };

  const calculateAge = (dob) => {
    if (!dob) return;
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

    return age;
  };

  const toggleMeetingInterest = () => {
    setMeetingInterest(!meetinInterest);
  };

  const [challengesProgress, setChallengesProgress] = useState([]);

  const loadChallengesProgress = async () => {
    let challengesProgres = await Promise.all(
      routeChallenges?.map(async (challenge) => {
        const { data: progress, error } = await getChallengeProgress(
          challenge?.challenge_id,
          currentUser?.profile_id,
        );

        return progress;
      }),
    );

    setChallengesProgress(challengesProgres);
  };

  useEffect(() => {
    if (!routeChallenges) return;

    loadChallengesProgress();
  }, [routeChallenges]);

  const setChallengeComplete = async (challengeId) => {
    const { data: challengeProgress, error } = await insertChallengeProgres(
      challengeId,
      currentUser?.profile_id,
    );

    console.log("error: ", error);
    loadChallengesProgress();
  };

  const loadChallengeTip = async (challengeId) => {
    const { data: tip, error } = await getChallengeTip(challengeId);

    console.log(tipActive);
    console.log(tip);
    setChallengeTip(tip);
  };

  return (
    <>
      <div className="game">
        <div className="game__map">
          <Map
            meetRequests={pendingMeetRequests}
            onRouteLoaded={(route, locations, challenges) => {
              setActiveRoute(route);
              setRouteLocations(locations);
              setRouteChallenges(route.challenges);
            }}
          />
        </div>
        <div className="game__buttons">
          <button className="game__challenges" onClick={revealChallenges}>
            <svg
              width="158"
              height="158"
              viewBox="0 0 158 158"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M88.875 0H79V9.87498H88.875V0Z" fill="#1E1E1E" />
              <path d="M79 0H69.125V9.87498H79V0Z" fill="#1E1E1E" />
              <path d="M98.75 9.875H88.875V19.75H98.75V9.875Z" fill="#1E1E1E" />
              <path d="M59.25 9.875H69.125V19.75H59.25V9.875Z" fill="#1E1E1E" />
              <path
                d="M98.75 19.75H88.875V29.625H98.75V19.75Z"
                fill="#1E1E1E"
              />
              <path
                d="M59.25 19.75H69.125V29.625H59.25V19.75Z"
                fill="#1E1E1E"
              />
              <path
                d="M108.625 29.625H98.75V39.5H108.625V29.625Z"
                fill="#1E1E1E"
              />
              <path
                d="M49.375 29.625H59.25V39.5H49.375V29.625Z"
                fill="#1E1E1E"
              />
              <path
                d="M108.625 39.5H98.75V49.375H108.625V39.5Z"
                fill="#1E1E1E"
              />
              <path d="M49.375 39.5H59.25V49.375H49.375V39.5Z" fill="#1E1E1E" />
              <path
                d="M118.5 49.375H108.625V59.25H118.5V49.375Z"
                fill="#1E1E1E"
              />
              <path d="M9.87498 59.25H0V69.125H9.87498V59.25Z" fill="#1E1E1E" />
              <path
                d="M148.125 59.25H158V69.125H148.125V59.25Z"
                fill="#1E1E1E"
              />
              <path d="M19.75 69.125H9.875V79H19.75V69.125Z" fill="#1E1E1E" />
              <path
                d="M138.25 69.125H148.125V79H138.25V69.125Z"
                fill="#1E1E1E"
              />
              <path d="M29.625 79H19.75V88.875H29.625V79Z" fill="#1E1E1E" />
              <path d="M128.375 79H138.25V88.875H128.375V79Z" fill="#1E1E1E" />
              <path
                d="M29.625 98.75H19.75V108.625H29.625V98.75Z"
                fill="#1E1E1E"
              />
              <path
                d="M128.375 98.75H138.25V108.625H128.375V98.75Z"
                fill="#1E1E1E"
              />
              <path d="M39.5 88.875H29.625V98.75H39.5V88.875Z" fill="#1E1E1E" />
              <path
                d="M118.5 88.875H128.375V98.75H118.5V88.875Z"
                fill="#1E1E1E"
              />
              <path
                d="M29.625 108.625H19.75V118.5H29.625V108.625Z"
                fill="#1E1E1E"
              />
              <path
                d="M128.375 108.625H138.25V118.5H128.375V108.625Z"
                fill="#1E1E1E"
              />
              <path
                d="M19.75 118.5H9.875V128.375H19.75V118.5Z"
                fill="#1E1E1E"
              />
              <path
                d="M138.25 118.5H148.125V128.375H138.25V118.5Z"
                fill="#1E1E1E"
              />
              <path
                d="M148.125 148.125H158V158H148.125V148.125Z"
                fill="#1E1E1E"
              />
              <path
                d="M138.25 128.375H148.125V138.25H138.25V128.375Z"
                fill="#1E1E1E"
              />
              <path
                d="M19.75 128.375H9.875V138.25H19.75V128.375Z"
                fill="#1E1E1E"
              />
              <path
                d="M9.87498 138.25H0V148.125H9.87498V138.25Z"
                fill="#1E1E1E"
              />
              <path
                d="M9.87498 148.125H0V158H9.87498V148.125Z"
                fill="#1E1E1E"
              />
              <path
                d="M138.25 148.125H148.125V158H138.25V148.125Z"
                fill="#1E1E1E"
              />
              <path
                d="M128.375 148.125H138.25V158H128.375V148.125Z"
                fill="#1E1E1E"
              />
              <path
                d="M19.75 148.125H9.875V158H19.75V148.125Z"
                fill="#1E1E1E"
              />
              <path
                d="M148.125 138.25H158V148.125H148.125V138.25Z"
                fill="#1E1E1E"
              />
              <path
                d="M29.625 148.125H19.75V158H29.625V148.125Z"
                fill="#1E1E1E"
              />
              <path
                d="M118.5 138.25H128.375V148.125H118.5V138.25Z"
                fill="#1E1E1E"
              />
              <path
                d="M39.5 138.25H29.625V148.125H39.5V138.25Z"
                fill="#1E1E1E"
              />
              <path
                d="M98.75 128.375H88.875V138.25H98.75V128.375Z"
                fill="#1E1E1E"
              />
              <path
                d="M59.25 128.375H69.125V138.25H59.25V128.375Z"
                fill="#1E1E1E"
              />
              <path d="M79 118.5H69.125V128.375H79V118.5Z" fill="#1E1E1E" />
              <path
                d="M108.625 128.375H98.75V138.25H108.625V128.375Z"
                fill="#1E1E1E"
              />
              <path
                d="M49.375 128.375H59.25V138.25H49.375V128.375Z"
                fill="#1E1E1E"
              />
              <path d="M88.875 118.5H79V128.375H88.875V118.5Z" fill="#1E1E1E" />
              <path
                d="M118.5 138.25H108.625V148.125H118.5V138.25Z"
                fill="#1E1E1E"
              />
              <path
                d="M39.5 138.25H49.375V148.125H39.5V138.25Z"
                fill="#1E1E1E"
              />
              <path
                d="M128.375 49.375H118.5V59.25H128.375V49.375Z"
                fill="#1E1E1E"
              />
              <path
                d="M9.87498 49.375H0V59.25H9.87498V49.375Z"
                fill="#1E1E1E"
              />
              <path
                d="M138.25 49.375H128.375V59.25H138.25V49.375Z"
                fill="#1E1E1E"
              />
              <path
                d="M19.75 49.375H9.875V59.25H19.75V49.375Z"
                fill="#1E1E1E"
              />
              <path
                d="M148.125 49.375H138.25V59.25H148.125V49.375Z"
                fill="#1E1E1E"
              />
              <path d="M158 49.375H148.125V59.25H158V49.375Z" fill="#1E1E1E" />
              <path
                d="M29.625 49.375H19.75V59.25H29.625V49.375Z"
                fill="#1E1E1E"
              />
              <path d="M39.5 49.375H29.625V59.25H39.5V49.375Z" fill="#1E1E1E" />
              <path
                d="M49.375 49.375H39.5V59.25H49.375V49.375Z"
                fill="#1E1E1E"
              />
            </svg>
          </button>
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
        </div>
        <Link
          className="social__profile"
          to={`/profile`}
          onClick={closeAllTabs}>
          <img src={currentUser?.avatar} alt="avatar" />
        </Link>
        <div className="game__navigation">
          {activeRoute?.route ? (
            <Link
              className="navigation__routes navigation__cancel button--navigation"
              to={`/home`}>
              <button onClick={closeAllTabs}>Cancel route</button>
            </Link>
          ) : (
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
                <path
                  d="M17.9991 15H16.4992V16.4999H17.9991V15Z"
                  fill="black"
                />
                <path
                  d="M16.4992 15H14.9992V16.4999H16.4992V15Z"
                  fill="black"
                />
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
                <path
                  d="M22.4989 18H20.9989V19.4999H22.4989V18Z"
                  fill="black"
                />
                <path
                  d="M22.4989 19.5H20.9989V20.9999H22.4989V19.5Z"
                  fill="black"
                />
                <path
                  d="M13.4993 13.5H11.9994V14.9999H13.4993V13.5Z"
                  fill="black"
                />
                <path
                  d="M16.4992 12H14.9992V13.4999H16.4992V12Z"
                  fill="black"
                />
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
                <path
                  d="M2.99983 12H1.49991V13.4999H2.99983V12Z"
                  fill="black"
                />
                <path
                  d="M4.49977 13.5H2.99985V14.9999H4.49977V13.5Z"
                  fill="black"
                />
                <path
                  d="M5.99968 13.5H4.49976V14.9999H5.99968V13.5Z"
                  fill="black"
                />
                <path
                  d="M7.49962 15H5.99969V16.4999H7.49962V15Z"
                  fill="black"
                />
                <path
                  d="M8.99956 15H7.49963V16.4999H8.99956V15Z"
                  fill="black"
                />
                <path
                  d="M10.4995 15H8.99954V16.4999H10.4995V15Z"
                  fill="black"
                />
                <path
                  d="M11.9994 15H10.4995V16.4999H11.9994V15Z"
                  fill="black"
                />
                <path
                  d="M14.9992 13.5H13.4993V14.9999H14.9992V13.5Z"
                  fill="black"
                />
              </svg>
              Look for routes
            </button>
          )}
        </div>
        <div className="challenges__section drawer">
          <div>
            <h2 className="drawer__title challenges__title">Side Quests</h2>
            <p className="drawer__description">
              Complete to unlock local tips!
            </p>
          </div>
          {activeRoute?.route ? (
            <div className="drawer__section">
              <h3 className="drawer__subtitle">In this route</h3>
              <ul className="home__challenges">
                {activeRoute?.challenges?.map((challenge) => (
                  <li
                    className="challenges__item"
                    key={challenge?.challenge_id}>
                    <p className="challenge__description">
                      {challenge?.description}
                    </p>
                    <p className="challenge__route archetype-tag">
                      {activeRoute?.route?.title}
                    </p>
                    <button
                      className="challenge__finish"
                      onClick={() => {
                        setChallengeComplete(challenge?.challenge_id);
                        loadChallengeTip(challenge?.challenge_id);
                        setTipActive(true);
                        closeAllTabs();
                      }}>
                      Complete
                    </button>
                    {/* {!challengesProgress?.some(
                      (progress) =>
                        progress?.challenge_id === challenge.challenge_id,
                    ) ? (
                      <button
                        className="challenge__finish"
                        onClick={() => {
                          setChallengeComplete(challenge.challenge_id);
                          loadChallengeTip(challenge?.challenge_id);
                          setTipActive(true);
                        }}>
                        Complete
                      </button>
                    ) : (
                      <button
                        className="challenge__finish"
                        onClick={() =>
                          setChallengeComplete(challenge.challenge_id)
                        }>
                        See local tip!
                      </button>
                    )} */}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="challenges__empty">
              <h3 className="empty__message">
                Start a route to reveal some side quests
              </h3>
              <button
                className="navigation__routes empty__search button--navigation"
                onClick={revealRoutes}>
                <svg
                  width="23"
                  height="21"
                  viewBox="0 0 23 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.499 18H17.9991V19.4999H19.499V18Z"
                    fill="black"
                  />
                  <path
                    d="M20.9989 19.5H19.499V20.9999H20.9989V19.5Z"
                    fill="black"
                  />
                  <path
                    d="M19.499 15H17.9991V16.4999H19.499V15Z"
                    fill="black"
                  />
                  <path
                    d="M17.9991 15H16.4992V16.4999H17.9991V15Z"
                    fill="black"
                  />
                  <path
                    d="M16.4992 15H14.9992V16.4999H16.4992V15Z"
                    fill="black"
                  />
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
                  <path
                    d="M20.9989 18H19.499V19.4999H20.9989V18Z"
                    fill="black"
                  />
                  <path
                    d="M20.9989 16.5H19.499V17.9999H20.9989V16.5Z"
                    fill="black"
                  />
                  <path
                    d="M22.4989 18H20.9989V19.4999H22.4989V18Z"
                    fill="black"
                  />
                  <path
                    d="M22.4989 19.5H20.9989V20.9999H22.4989V19.5Z"
                    fill="black"
                  />
                  <path
                    d="M13.4993 13.5H11.9994V14.9999H13.4993V13.5Z"
                    fill="black"
                  />
                  <path
                    d="M16.4992 12H14.9992V13.4999H16.4992V12Z"
                    fill="black"
                  />
                  <path
                    d="M16.4992 10.5H14.9992V11.9999H16.4992V10.5Z"
                    fill="black"
                  />
                  <path
                    d="M17.9991 9H16.4992V10.4999H17.9991V9Z"
                    fill="black"
                  />
                  <path
                    d="M17.9991 7.5H16.4992V8.99992H17.9991V7.5Z"
                    fill="black"
                  />
                  <path
                    d="M17.9991 6H16.4992V7.49992H17.9991V6Z"
                    fill="black"
                  />
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
                  <path
                    d="M11.9994 0H10.4995V1.49992H11.9994V0Z"
                    fill="black"
                  />
                  <path
                    d="M10.4995 0H8.99954V1.49992H10.4995V0Z"
                    fill="black"
                  />
                  <path
                    d="M8.99956 0H7.49963V1.49992H8.99956V0Z"
                    fill="black"
                  />
                  <path
                    d="M7.49962 0H5.99969V1.49992H7.49962V0Z"
                    fill="black"
                  />
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
                  <path
                    d="M2.99983 12H1.49991V13.4999H2.99983V12Z"
                    fill="black"
                  />
                  <path
                    d="M4.49977 13.5H2.99985V14.9999H4.49977V13.5Z"
                    fill="black"
                  />
                  <path
                    d="M5.99968 13.5H4.49976V14.9999H5.99968V13.5Z"
                    fill="black"
                  />
                  <path
                    d="M7.49962 15H5.99969V16.4999H7.49962V15Z"
                    fill="black"
                  />
                  <path
                    d="M8.99956 15H7.49963V16.4999H8.99956V15Z"
                    fill="black"
                  />
                  <path
                    d="M10.4995 15H8.99954V16.4999H10.4995V15Z"
                    fill="black"
                  />
                  <path
                    d="M11.9994 15H10.4995V16.4999H11.9994V15Z"
                    fill="black"
                  />
                  <path
                    d="M14.9992 13.5H13.4993V14.9999H14.9992V13.5Z"
                    fill="black"
                  />
                </svg>
                Look for routes
              </button>
            </div>
          )}
        </div>
        <div className="social__section drawer">
          <h2 className="drawer__title">Nearby Explorers</h2>
          {closeProfiles.length + farProfiles.length > 0 || currentUser?.is_visible === false ? (
            <>
              {closeProfiles.length > 0 ? (
                <div className="drawer__section">
                  <h3 className="drawer__subtitle">200m radius</h3>
                  <ul className="social__nearby">
                    {closeProfiles?.map((profile) => {
                      if (profile?.profile_id !== currentUser?.profile_id) {
                        return (
                          <li
                            className="nearby__user"
                            key={profile?.profile_id}>
                            <div className="nearby__info">
                              <div
                                className="nearby__avater"
                                style={{
                                  backgroundColor: `#${profileArchetypes[profile?.primary_archetype]?.colour}`,
                                }}>
                                pfp
                              </div>
                              <div className="info__text">
                                <p className="nearby__name">
                                  {profile?.name}, XX
                                </p>
                                <p
                                  className="nearby__archetype archetype-tag"
                                  style={{
                                    backgroundColor: `#${profileArchetypes[profile?.primary_archetype]?.colour}`,
                                  }}>
                                  {
                                    profileArchetypes[
                                      profile?.primary_archetype
                                    ]?.tag
                                  }
                                </p>
                              </div>
                            </div>
                            <p>{profile?.description}</p>
                            <div className="nearby__stats">
                              <div
                                className="stats__routes"
                                style={{
                                  backgroundColor: `#${profileArchetypes[profile?.primary_archetype]?.colour}1a`,
                                }}>
                                <p
                                  className="stat__number"
                                  style={{
                                    color: `#${profileArchetypes[profile?.primary_archetype]?.colour}`,
                                  }}>
                                  3
                                </p>
                                <p className="stat__label">Routes</p>
                              </div>
                              <div
                                className="stats__challenges"
                                style={{
                                  backgroundColor: `#${profileArchetypes[profile?.primary_archetype]?.colour}1a`,
                                }}>
                                <p
                                  className="stat__number"
                                  style={{
                                    color: `#${profileArchetypes[profile?.primary_archetype]?.colour}`,
                                  }}>
                                  5
                                </p>
                                <p className="stat__label">Side Quests</p>
                              </div>
                              <div
                                className="stats__meets"
                                style={{
                                  backgroundColor: `#${profileArchetypes[profile?.primary_archetype]?.colour}1a`,
                                }}>
                                <p
                                  className="stat__number"
                                  style={{
                                    color: `#${profileArchetypes[profile?.primary_archetype]?.colour}`,
                                  }}>
                                  1
                                </p>
                                <p className="stat__label">Meet Ups</p>
                              </div>
                            </div>
                            <button
                              className="nearby__meet"
                              onClick={() => {
                                sendMeetRequest(profile?.profile_id);
                                closeAllTabs();
                              }}>
                              Ask to meet up!
                            </button>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
              {farProfiles.length > 0 ? (
                <div className="drawer__section">
                  <h3 className="drawer__subtitle">500m radius</h3>
                  <ul className="social__nearby">
                    {farProfiles?.map((profile) => {
                      if (profile?.profile_id !== currentUser?.profile_id) {
                        return (
                          <li
                            className="nearby__user"
                            key={profile?.profile_id}>
                            <div className="nearby__info">
                              <div
                                className="nearby__avater"
                                style={{
                                  backgroundColor: `#${profileArchetypes[profile?.primary_archetype]?.colour}`,
                                }}>
                                pfp
                              </div>
                              <div className="info__text">
                                <p className="nearby__name">
                                  {profile?.name}, XX
                                </p>
                                <p
                                  className="nearby__archetype archetype-tag"
                                  style={{
                                    backgroundColor: `#${profileArchetypes[profile?.primary_archetype]?.colour}`,
                                  }}>
                                  {
                                    profileArchetypes[
                                      profile?.primary_archetype
                                    ]?.tag
                                  }
                                </p>
                              </div>
                            </div>
                            <p>{profile?.description}</p>
                            <div className="nearby__stats">
                              <div
                                className="stats__routes"
                                style={{
                                  backgroundColor: `#${profileArchetypes[profile?.primary_archetype]?.colour}1a`,
                                }}>
                                <p
                                  className="stat__number"
                                  style={{
                                    color: `#${profileArchetypes[profile?.primary_archetype]?.colour}`,
                                  }}>
                                  3
                                </p>
                                <p className="stat__label">Routes</p>
                              </div>
                              <div
                                className="stats__challenges"
                                style={{
                                  backgroundColor: `#${profileArchetypes[profile?.primary_archetype]?.colour}1a`,
                                }}>
                                <p
                                  className="stat__number"
                                  style={{
                                    color: `#${profileArchetypes[profile?.primary_archetype]?.colour}`,
                                  }}>
                                  5
                                </p>
                                <p className="stat__label">Side Quests</p>
                              </div>
                              <div
                                className="stats__meets"
                                style={{
                                  backgroundColor: `#${profileArchetypes[profile?.primary_archetype]?.colour}1a`,
                                }}>
                                <p
                                  className="stat__number"
                                  style={{
                                    color: `#${profileArchetypes[profile?.primary_archetype]?.colour}`,
                                  }}>
                                  1
                                </p>
                                <p className="stat__label">Meet Ups</p>
                              </div>
                            </div>
                            <button
                              className="nearby__meet"
                              onClick={() => {
                                sendMeetRequest(profile?.profile_id);
                                closeAllTabs();
                              }}>
                              Ask to meet up!
                            </button>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <div className="social__empty">
                <p className="empty__error">Error 404</p>
                <h3 className="empty__message">Nearby explorers not found</h3>
                <img className="empty__tumbleweed" src={tumbleweed} alt="tumbleweed" />
              </div>
            </>
          )}
        </div>
        <div className="navigation__section drawer">
          <h2 className="drawer__title">Exploring Routes</h2>
          <div className="drawer__section">
            <h3 className="drawer__subtitle">For you</h3>
            <ul className="routes__list">
              {routes?.map((route) => (
                <li className="routes__item" key={route?.route_id}>
                  <img
                    className="route__cover"
                    src={route?.route_cover}
                    alt="cover"
                  />
                  <div className="route__text">
                    <h2 className="route__title">{route?.title}</h2>
                    <p
                      className="archetype-tag"
                      style={{
                        backgroundColor: `#${routeArchetypes[route?.archetypes[0]]?.colour}`,
                      }}>
                      {routeArchetypes[route?.archetypes[0]]?.tag}
                    </p>
                    <div
                      className="route__info"
                      style={{
                        backgroundColor: `#${routeArchetypes[route?.archetypes[0]]?.colour}33`,
                      }}>
                      <div className="route__stops">
                        <svg
                          className="info__icon"
                          width="158"
                          height="158"
                          viewBox="0 0 158 158"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M89.9264 147.434H79.3691V157.991H89.9264V147.434Z"
                            fill="black"
                          />
                          <path
                            d="M78.6296 147.434H68.0723V157.991H78.6296V147.434Z"
                            fill="black"
                          />
                          <path
                            d="M67.3483 137.941H56.791V148.499H67.3483V137.941Z"
                            fill="black"
                          />
                          <path
                            d="M90.6536 137.906H101.211V148.464H90.6536V137.906Z"
                            fill="black"
                          />
                          <path
                            d="M56.0671 128.031H45.5098V138.589H56.0671V128.031Z"
                            fill="black"
                          />
                          <path
                            d="M101.935 127.992H112.492V138.549H101.935V127.992Z"
                            fill="black"
                          />
                          <path
                            d="M44.7839 118.156H34.2266V128.714H44.7839V118.156Z"
                            fill="black"
                          />
                          <path
                            d="M113.216 118.156H123.773V128.714H113.216V118.156Z"
                            fill="black"
                          />
                          <path
                            d="M33.4889 108.281H22.9316V118.839H33.4889V108.281Z"
                            fill="black"
                          />
                          <path
                            d="M124.513 108.242H135.07V118.799H124.513V108.242Z"
                            fill="black"
                          />
                          <path
                            d="M22.2077 98.4062H11.6504V108.964H22.2077V98.4062Z"
                            fill="black"
                          />
                          <path
                            d="M135.794 98.4062H146.352V108.964H135.794V98.4062Z"
                            fill="black"
                          />
                          <path
                            d="M22.2077 88.5312H11.6504V99.0885H22.2077V88.5312Z"
                            fill="black"
                          />
                          <path
                            d="M135.794 88.4922H146.352V99.0495H135.794V88.4922Z"
                            fill="black"
                          />
                          <path
                            d="M10.9264 78.6562H0.369141V89.2135H10.9264V78.6562Z"
                            fill="black"
                          />
                          <path
                            d="M147.443 78.6172H158V89.1745H147.443V78.6172Z"
                            fill="black"
                          />
                          <path
                            d="M10.9264 68.7812H0.369141V79.3385H10.9264V68.7812Z"
                            fill="black"
                          />
                          <path
                            d="M147.076 68.7812H157.633V79.3385H147.076V68.7812Z"
                            fill="black"
                          />
                          <path
                            d="M10.9264 58.9062H0.369141V69.4635H10.9264V58.9062Z"
                            fill="black"
                          />
                          <path
                            d="M147.076 58.8672H157.633V69.4245H147.076V58.8672Z"
                            fill="black"
                          />
                          <path
                            d="M10.9264 49.0312H0.369141V59.5885H10.9264V49.0312Z"
                            fill="black"
                          />
                          <path
                            d="M147.076 49.0312H157.633V59.5885H147.076V49.0312Z"
                            fill="black"
                          />
                          <path
                            d="M10.5573 39.1562H0V49.7135H10.5573V39.1562Z"
                            fill="black"
                          />
                          <path
                            d="M147.076 39.1172H157.633V49.6745H147.076V39.1172Z"
                            fill="black"
                          />
                          <path
                            d="M22.2077 29.3164H11.6504V39.8737H22.2077V29.3164Z"
                            fill="black"
                          />
                          <path
                            d="M135.794 29.2812H146.352V39.8385H135.794V29.2812Z"
                            fill="black"
                          />
                          <path
                            d="M33.4889 19.4062H22.9316V29.9635H33.4889V19.4062Z"
                            fill="black"
                          />
                          <path
                            d="M124.513 19.3672H135.07V29.9245H124.513V19.3672Z"
                            fill="black"
                          />
                          <path
                            d="M44.7839 9.53125H34.2266V20.0885H44.7839V9.53125Z"
                            fill="black"
                          />
                          <path
                            d="M113.216 9.49219H123.773V20.0495H113.216V9.49219Z"
                            fill="black"
                          />
                          <path
                            d="M56.0671 0H45.5098V10.5573H56.0671V0Z"
                            fill="black"
                          />
                          <path
                            d="M67.3483 0H56.791V10.5573H67.3483V0Z"
                            fill="black"
                          />
                          <path
                            d="M78.6296 0H68.0723V10.5573H78.6296V0Z"
                            fill="black"
                          />
                          <path
                            d="M101.208 0H90.6504V10.5573H101.208V0Z"
                            fill="black"
                          />
                          <path
                            d="M112.489 0H101.932V10.5573H112.489V0Z"
                            fill="black"
                          />
                          <path
                            d="M78.6296 38.5742H68.0723V49.1315H78.6296V38.5742Z"
                            fill="black"
                          />
                          <path
                            d="M78.6296 78.0742H68.0723V88.6315H78.6296V78.0742Z"
                            fill="black"
                          />
                          <path
                            d="M101.211 59.0417V48.4844H90.6536V59.0417H101.211Z"
                            fill="black"
                          />
                          <path
                            d="M67.3516 59.0417V48.4844H56.7943V59.0417H67.3516Z"
                            fill="black"
                          />
                          <path
                            d="M89.9264 38.5742H79.3691V49.1315H89.9264V38.5742Z"
                            fill="black"
                          />
                          <path
                            d="M89.9264 78.0742H79.3691V88.6315H89.9264V78.0742Z"
                            fill="black"
                          />
                          <path
                            d="M112.492 68.9167V58.3594H101.935V68.9167H112.492Z"
                            fill="black"
                          />
                          <path
                            d="M56.0703 68.9167V58.3594H45.513V68.9167H56.0703Z"
                            fill="black"
                          />
                          <path
                            d="M101.211 78.7917V68.2344H90.6536V78.7917H101.211Z"
                            fill="black"
                          />
                          <path
                            d="M67.3516 78.7917V68.2344H56.7943V78.7917H67.3516Z"
                            fill="black"
                          />
                          <path
                            d="M89.9264 0H79.3691V10.5573H89.9264V0Z"
                            fill="black"
                          />
                        </svg>
                        <p>{route?.locations.length} stops</p>
                      </div>
                      <div>
                        <svg
                          className="info__icon"
                          width="158"
                          height="158"
                          viewBox="0 0 158 158"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M17.5545 105.348H8.77734V114.125H17.5545V105.348Z"
                            fill="black"
                          />
                          <path
                            d="M17.5545 96.5547H8.77734V105.332H17.5545V96.5547Z"
                            fill="black"
                          />
                          <path
                            d="M8.77716 87.8047H0V96.5822H8.77716V87.8047Z"
                            fill="black"
                          />
                          <path
                            d="M8.77716 79.0078H0V87.7853H8.77716V79.0078Z"
                            fill="black"
                          />
                          <path
                            d="M8.77716 70.2031H0V78.9806H8.77716V70.2031Z"
                            fill="black"
                          />
                          <path
                            d="M8.77716 61.457H0V70.2346H8.77716V61.457Z"
                            fill="black"
                          />
                          <path
                            d="M17.5408 52.6133H8.76367V61.3908H17.5408V52.6133Z"
                            fill="black"
                          />
                          <path
                            d="M17.5408 43.8672H8.76367V52.6447H17.5408V43.8672Z"
                            fill="black"
                          />
                          <path
                            d="M17.5408 43.8672H8.76367V52.6447H17.5408V43.8672Z"
                            fill="black"
                          />
                          <path
                            d="M26.3006 35.0625H17.5234V43.84H26.3006V35.0625Z"
                            fill="black"
                          />
                          <path
                            d="M35.1619 26.3477H26.3848V35.1252H35.1619V26.3477Z"
                            fill="black"
                          />
                          <path
                            d="M43.9158 17.5156H35.1387V26.2931H43.9158V17.5156Z"
                            fill="black"
                          />
                          <path
                            d="M52.6346 8.79297H43.8574V17.5705H52.6346V8.79297Z"
                            fill="black"
                          />
                          <path
                            d="M61.4197 8.75781H52.6426V17.5353H61.4197V8.75781Z"
                            fill="black"
                          />
                          <path
                            d="M70.2108 0H61.4336V8.77752H70.2108V0Z"
                            fill="black"
                          />
                          <path
                            d="M78.9959 0H70.2188V8.77752H78.9959V0Z"
                            fill="black"
                          />
                          <path
                            d="M87.7733 0H78.9961V8.77752H87.7733V0Z"
                            fill="black"
                          />
                          <path
                            d="M96.5447 0H87.7676V8.77752H96.5447V0Z"
                            fill="black"
                          />
                          <path
                            d="M105.322 8.79297H96.5449V17.5705H105.322V8.79297Z"
                            fill="black"
                          />
                          <path
                            d="M114.099 8.79297H105.322V17.5705H114.099V8.79297Z"
                            fill="black"
                          />
                          <path
                            d="M122.881 17.5547H114.104V26.3322H122.881V17.5547Z"
                            fill="black"
                          />
                          <path
                            d="M131.658 26.3477H122.881V35.1252H131.658V26.3477Z"
                            fill="black"
                          />
                          <path
                            d="M140.433 35.1055H131.656V43.883H140.433V35.1055Z"
                            fill="black"
                          />
                          <path
                            d="M149.215 43.9023H140.438V52.6799H149.215V43.9023Z"
                            fill="black"
                          />
                          <path
                            d="M149.215 52.6602H140.438V61.4377H149.215V52.6602Z"
                            fill="black"
                          />
                          <path
                            d="M157.992 61.457H149.215V70.2346H157.992V61.457Z"
                            fill="black"
                          />
                          <path
                            d="M157.992 70.2031H149.215V78.9806H157.992V70.2031Z"
                            fill="black"
                          />
                          <path
                            d="M157.992 79.0078H149.215V87.7853H157.992V79.0078Z"
                            fill="black"
                          />
                          <path
                            d="M157.992 87.8047H149.215V96.5822H157.992V87.8047Z"
                            fill="black"
                          />
                          <path
                            d="M149.215 96.5547H140.438V105.332H149.215V96.5547Z"
                            fill="black"
                          />
                          <path
                            d="M149.215 105.348H140.438V114.125H149.215V105.348Z"
                            fill="black"
                          />
                          <path
                            d="M140.433 114.07H131.656V122.848H140.433V114.07Z"
                            fill="black"
                          />
                          <path
                            d="M131.658 122.867H122.881V131.645H131.658V122.867Z"
                            fill="black"
                          />
                          <path
                            d="M122.881 131.66H114.104V140.438H122.881V131.66Z"
                            fill="black"
                          />
                          <path
                            d="M114.099 140.418H105.322V149.195H114.099V140.418Z"
                            fill="black"
                          />
                          <path
                            d="M105.322 140.418H96.5449V149.195H105.322V140.418Z"
                            fill="black"
                          />
                          <path
                            d="M96.5447 149.215H87.7676V157.992H96.5447V149.215Z"
                            fill="black"
                          />
                          <path
                            d="M87.7733 149.215H78.9961V157.992H87.7733V149.215Z"
                            fill="black"
                          />
                          <path
                            d="M78.9959 149.215H70.2188V157.992H78.9959V149.215Z"
                            fill="black"
                          />
                          <path
                            d="M70.2108 149.215H61.4336V157.992H70.2108V149.215Z"
                            fill="black"
                          />
                          <path
                            d="M61.4393 140.418H52.6621V149.195H61.4393V140.418Z"
                            fill="black"
                          />
                          <path
                            d="M52.6619 140.418H43.8848V149.195H52.6619V140.418Z"
                            fill="black"
                          />
                          <path
                            d="M43.8904 131.66H35.1133V140.438H43.8904V131.66Z"
                            fill="black"
                          />
                          <path
                            d="M35.1131 122.867H26.3359V131.645H35.1131V122.867Z"
                            fill="black"
                          />
                          <path
                            d="M26.326 114.07H17.5488V122.848H26.326V114.07Z"
                            fill="black"
                          />
                          <path
                            d="M83.367 74.6445H74.5898V83.4221H83.367V74.6445Z"
                            fill="black"
                          />
                          <path
                            d="M83.367 65.8828H74.5898V74.6603H83.367V65.8828Z"
                            fill="black"
                          />
                          <path
                            d="M92.1289 83.4221V74.6445H83.3518V83.4221H92.1289Z"
                            fill="black"
                          />
                          <path
                            d="M83.367 57.0898H74.5898V65.8674H83.367V57.0898Z"
                            fill="black"
                          />
                          <path
                            d="M100.883 83.4221V74.6445H92.1057V83.4221H100.883Z"
                            fill="black"
                          />
                          <path
                            d="M83.367 48.3398H74.5898V57.1174H83.367V48.3398Z"
                            fill="black"
                          />
                          <path
                            d="M109.652 83.4221V74.6445H100.875V83.4221H109.652Z"
                            fill="black"
                          />
                          <path
                            d="M83.367 39.6172H74.5898V48.3947H83.367V39.6172Z"
                            fill="black"
                          />
                          <path
                            d="M118.414 83.4221V74.6445H109.637V83.4221H118.414Z"
                            fill="black"
                          />
                          <path
                            d="M83.367 30.8242H74.5898V39.6017H83.367V30.8242Z"
                            fill="black"
                          />
                        </svg>
                        <p>{route?.time} min</p>
                      </div>
                      <div className="route__distance">
                        <svg
                          className="info__icon"
                          width="157"
                          height="158"
                          viewBox="0 0 157 158"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <rect
                            x="83.7559"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="94.1895"
                            y="18.2812"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="83.7559"
                            y="46.0977"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="83.7559"
                            y="36.7969"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="104.613"
                            y="13.6523"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="83.7559"
                            y="55.3125"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="73.3184"
                            y="50.7266"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="42.0293"
                            y="50.7266"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="114.461"
                            y="153.297"
                            width="9.83549"
                            height="9.83549"
                            transform="rotate(180 114.461 153.297)"
                            fill="black"
                          />
                          <rect
                            x="31.5898"
                            y="50.7266"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="124.887"
                            y="153.297"
                            width="9.83549"
                            height="9.83549"
                            transform="rotate(180 124.887 153.297)"
                            fill="black"
                          />
                          <rect
                            x="21.1582"
                            y="50.7266"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="135.318"
                            y="153.297"
                            width="9.83549"
                            height="9.83549"
                            transform="rotate(180 135.318 153.297)"
                            fill="black"
                          />
                          <rect
                            x="10.7344"
                            y="59.9844"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="145.752"
                            y="144.039"
                            width="9.83549"
                            height="9.83549"
                            transform="rotate(180 145.752 144.039)"
                            fill="black"
                          />
                          <rect
                            y="69.2422"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="156.477"
                            y="134.738"
                            width="9.83549"
                            height="9.83549"
                            transform="rotate(180 156.477 134.738)"
                            fill="black"
                          />
                          <rect
                            x="0.300781"
                            y="78.5391"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="156.186"
                            y="125.523"
                            width="9.83549"
                            height="9.83549"
                            transform="rotate(180 156.186 125.523)"
                            fill="black"
                          />
                          <rect
                            x="10.7344"
                            y="87.7969"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="145.752"
                            y="116.188"
                            width="9.83549"
                            height="9.83549"
                            transform="rotate(180 145.752 116.188)"
                            fill="black"
                          />
                          <rect
                            x="21.1582"
                            y="97.0898"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="31.5898"
                            y="97.0898"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="42.0293"
                            y="97.0898"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="52.4609"
                            y="97.0898"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="62.8867"
                            y="97.0898"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="73.3184"
                            y="97.0898"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="83.7559"
                            y="97.0898"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="94.1895"
                            y="97.0898"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="104.613"
                            y="97.0898"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="115.047"
                            y="97.0898"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="125.48"
                            y="97.0898"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="52.4609"
                            y="50.7266"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="104.023"
                            y="153.297"
                            width="9.83549"
                            height="9.83549"
                            transform="rotate(180 104.023 153.297)"
                            fill="black"
                          />
                          <rect
                            x="114.248"
                            y="18.2812"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="104.613"
                            y="22.9102"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="83.7559"
                            y="27.5391"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="83.7559"
                            y="18.2812"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="83.7559"
                            y="9.02344"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="62.8867"
                            y="50.7266"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="93.5918"
                            y="153.297"
                            width="9.83549"
                            height="9.83549"
                            transform="rotate(180 93.5918 153.297)"
                            fill="black"
                          />
                          <rect
                            x="94.0723"
                            y="158"
                            width="20.4275"
                            height="20.4275"
                            transform="rotate(180 94.0723 158)"
                            fill="black"
                          />
                          <rect
                            x="99.291"
                            y="66.1953"
                            width="20.4275"
                            height="20.4275"
                            transform="rotate(180 99.291 66.1953)"
                            fill="black"
                          />
                          <rect
                            x="94.1895"
                            y="27.5391"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                          <rect
                            x="94.1895"
                            y="9.02344"
                            width="9.83549"
                            height="9.83549"
                            fill="black"
                          />
                        </svg>
                        <p>{route?.distance} km</p>
                      </div>
                      <div>
                        <svg
                          className="info__icon"
                          width="158"
                          height="158"
                          viewBox="0 0 158 158"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M88.875 0H79V9.87498H88.875V0Z"
                            fill="#1E1E1E"
                          />
                          <path d="M79 0H69.125V9.87498H79V0Z" fill="#1E1E1E" />
                          <path
                            d="M98.75 9.875H88.875V19.75H98.75V9.875Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M59.25 9.875H69.125V19.75H59.25V9.875Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M98.75 19.75H88.875V29.625H98.75V19.75Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M59.25 19.75H69.125V29.625H59.25V19.75Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M108.625 29.625H98.75V39.5H108.625V29.625Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M49.375 29.625H59.25V39.5H49.375V29.625Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M108.625 39.5H98.75V49.375H108.625V39.5Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M49.375 39.5H59.25V49.375H49.375V39.5Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M118.5 49.375H108.625V59.25H118.5V49.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M9.87498 59.25H0V69.125H9.87498V59.25Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M148.125 59.25H158V69.125H148.125V59.25Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M19.75 69.125H9.875V79H19.75V69.125Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M138.25 69.125H148.125V79H138.25V69.125Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M29.625 79H19.75V88.875H29.625V79Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M128.375 79H138.25V88.875H128.375V79Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M29.625 98.75H19.75V108.625H29.625V98.75Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M128.375 98.75H138.25V108.625H128.375V98.75Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M39.5 88.875H29.625V98.75H39.5V88.875Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M118.5 88.875H128.375V98.75H118.5V88.875Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M29.625 108.625H19.75V118.5H29.625V108.625Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M128.375 108.625H138.25V118.5H128.375V108.625Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M19.75 118.5H9.875V128.375H19.75V118.5Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M138.25 118.5H148.125V128.375H138.25V118.5Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M148.125 148.125H158V158H148.125V148.125Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M138.25 128.375H148.125V138.25H138.25V128.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M19.75 128.375H9.875V138.25H19.75V128.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M9.87498 138.25H0V148.125H9.87498V138.25Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M9.87498 148.125H0V158H9.87498V148.125Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M138.25 148.125H148.125V158H138.25V148.125Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M128.375 148.125H138.25V158H128.375V148.125Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M19.75 148.125H9.875V158H19.75V148.125Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M148.125 138.25H158V148.125H148.125V138.25Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M29.625 148.125H19.75V158H29.625V148.125Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M118.5 138.25H128.375V148.125H118.5V138.25Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M39.5 138.25H29.625V148.125H39.5V138.25Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M98.75 128.375H88.875V138.25H98.75V128.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M59.25 128.375H69.125V138.25H59.25V128.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M79 118.5H69.125V128.375H79V118.5Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M108.625 128.375H98.75V138.25H108.625V128.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M49.375 128.375H59.25V138.25H49.375V128.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M88.875 118.5H79V128.375H88.875V118.5Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M118.5 138.25H108.625V148.125H118.5V138.25Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M39.5 138.25H49.375V148.125H39.5V138.25Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M128.375 49.375H118.5V59.25H128.375V49.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M9.87498 49.375H0V59.25H9.87498V49.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M138.25 49.375H128.375V59.25H138.25V49.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M19.75 49.375H9.875V59.25H19.75V49.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M148.125 49.375H138.25V59.25H148.125V49.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M158 49.375H148.125V59.25H158V49.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M29.625 49.375H19.75V59.25H29.625V49.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M39.5 49.375H29.625V59.25H39.5V49.375Z"
                            fill="#1E1E1E"
                          />
                          <path
                            d="M49.375 49.375H39.5V59.25H49.375V49.375Z"
                            fill="#1E1E1E"
                          />
                        </svg>

                        <p>{`5`} quests</p>
                      </div>
                    </div>
                    <p className="route__description">{route?.description}</p>
                  </div>
                  <Link
                    className="route__follow"
                    to={`?route=${route?.route_id}`}>
                    <button onClick={closeAllTabs}>Follow Route</button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to={`/home`}>Cancel routes</Link>
          <button className="" onClick={revealRoutes}>
            Close
          </button>
        </div>
        {pendingMeetRequests
          .filter((request) => request.status === "pending")
          .map((meetRequest) =>
            meetRequest?.sender_id !== currentUser?.profile_id ? (
              <div className="game__meetup" key={meetRequest?.meet_id}>
                <div className="meetup__sender">
                  <p className="sender__name">
                    {senderProfile?.name},{" "}
                    {calculateAge(senderProfile?.date_of_birth)}
                  </p>
                  <p
                    className="archetype-tag "
                    style={{ backgroundColor: `#${senderArchetype?.colour}` }}>
                    {senderArchetype?.tag}
                  </p>
                </div>
                <div className="meetup__content">
                  {!meetinInterest ? (
                    <p className="meetup__message">
                      Has sent you a meet up request!
                    </p>
                  ) : (
                    <div className="sender__information">
                      <div className="information__info">
                        <div className="sender__gender">
                          {senderProfile?.gender}
                        </div>
                        <div className="sender__distance">
                          {Math.round(
                            calculateDistance(
                              senderProfile?.coordinates,
                              currentUser,
                            ),
                          )}
                          m
                        </div>
                        <div className="sender__age">
                          {calculateAge(senderProfile?.date_of_birth) - 4} -{" "}
                          {calculateAge(senderProfile?.date_of_birth) + 4}
                        </div>
                      </div>
                      <p className="information__description">
                        {senderProfile?.description}
                      </p>
                      {/* <div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div> */}
                    </div>
                  )}
                  <div className="meetup__buttons">
                    <button
                      className="meetup__decline"
                      onClick={() =>
                        updateMeetupStatus(meetRequest?.meet_id, "declined")
                      }>
                      Decline
                    </button>
                    {!meetinInterest ? (
                      <button
                        className="meetup__accept"
                        onClick={toggleMeetingInterest}>
                        Profile
                      </button>
                    ) : (
                      <button
                        className="meetup__accept"
                        onClick={() =>
                          updateMeetupStatus(meetRequest?.meet_id, "accepted")
                        }>
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            ),
          )}
        {tipActive ? (
          <div className="popup-container">
            <div className="challenge__tip">
              <div className="tip__header">
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.69228 0H9.23074V1.50002H7.69228V0Z"
                    fill="white"
                  />
                  <path
                    d="M6.15385 1.49988L7.69228 1.50002L7.69231 2.9999H6.15385V1.49988Z"
                    fill="white"
                  />
                  <path
                    d="M6.15385 0H7.69228V1.50002L6.15385 1.49988V0Z"
                    fill="white"
                  />
                  <path
                    d="M13.8461 1.49988H12.3077V2.9999H13.8461V1.49988Z"
                    fill="white"
                  />
                  <path
                    d="M13.8461 0H12.3077V1.49988H13.8461V0Z"
                    fill="white"
                  />
                  <path
                    d="M4.61536 1.49988H6.15385V2.9999H4.61536V1.49988Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 1.49988H13.8461V2.9999H15.3846V1.49988Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 2.99976L4.61536 2.9999L4.61538 4.49977H3.07692V2.99976Z"
                    fill="white"
                  />
                  <path
                    d="M16.923 2.99976L15.3846 2.9999L15.3846 4.49977H16.923V2.99976Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 4.49977H4.61538V5.99965H3.07692V4.49977Z"
                    fill="white"
                  />
                  <path
                    d="M16.923 4.49977H15.3846V5.99965H16.923V4.49977Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 5.99965H4.61538V7.49953H3.07692V5.99965Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 5.99951L3.07692 5.99965V7.49953H1.53843V5.99951Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 4.49963L3.07692 4.49977V5.99965L1.53843 5.99951V4.49963Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 7.49953H4.61538V8.99941H3.07692V7.49953Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 7.49953H3.07692V8.99941H1.53843V7.49953Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 8.99941H4.61538V10.4993H3.07692V8.99941Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 10.4993H4.61538V11.9992H3.07692V10.4993Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 11.9992H4.61538V13.499H3.07692V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 13.499H4.61538V14.9989H3.07692V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 15.0006H4.61538V16.5006H3.07692V15.0006Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 16.5006H4.61538V18.0005H3.07692V16.5006Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 18.0005H4.61538V19.5004H3.07692V18.0005Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 19.5004H4.61538V21.0002H3.07692V19.5004Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 21.0002H4.61538V22.5001H3.07692V21.0002Z"
                    fill="white"
                  />
                  <path
                    d="M3.07692 22.5001H4.61538V24H3.07692V22.5001Z"
                    fill="white"
                  />
                  <path
                    d="M4.61538 10.4993L6.15382 10.4991V11.9992H4.61538V10.4993Z"
                    fill="white"
                  />
                  <path
                    d="M4.61538 11.9992H6.15382V13.499H4.61538V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M4.61538 13.499H6.15382V14.9989H4.61538V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M4.61538 15.0006H6.15382V16.5006H4.61538V15.0006Z"
                    fill="white"
                  />
                  <path
                    d="M4.61538 16.5006H6.15382V18.0005H4.61538V16.5006Z"
                    fill="white"
                  />
                  <path
                    d="M4.61538 18.0005H6.15382V19.5004H4.61538V18.0005Z"
                    fill="white"
                  />
                  <path
                    d="M4.61538 19.5004H6.15382V21.0002H4.61538V19.5004Z"
                    fill="white"
                  />
                  <path
                    d="M4.61538 21.0002H6.15382V22.5001H4.61538V21.0002Z"
                    fill="white"
                  />
                  <path
                    d="M4.61538 22.5001H6.15382V24H4.61538V22.5001Z"
                    fill="white"
                  />
                  <path
                    d="M6.15382 10.4991H7.69231V11.9992H6.15382V10.4991Z"
                    fill="white"
                  />
                  <path
                    d="M6.15382 11.9992H7.69231V13.499H6.15382V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M6.15382 13.499H7.69231V14.9989H6.15382V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M6.15382 15.0006H7.69231V16.5006H6.15382V15.0006Z"
                    fill="white"
                  />
                  <path
                    d="M6.15382 16.5006H7.69231V18.0005H6.15382V16.5006Z"
                    fill="white"
                  />
                  <path
                    d="M6.15382 18.0005H7.69231V19.5004H6.15382V18.0005Z"
                    fill="white"
                  />
                  <path
                    d="M6.15382 19.5004H7.69231V21.0002H6.15382V19.5004Z"
                    fill="white"
                  />
                  <path
                    d="M6.15382 21.0002H7.69231V22.5001H6.15382V21.0002Z"
                    fill="white"
                  />
                  <path
                    d="M6.15382 22.5001H7.69231V24H6.15382V22.5001Z"
                    fill="white"
                  />
                  <path
                    d="M7.69231 10.4991H9.23074V11.9992H7.69231V10.4991Z"
                    fill="white"
                  />
                  <path
                    d="M7.69231 11.9992H9.23074V13.499H7.69231V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M7.69231 13.499H9.23074V14.9989H7.69231V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M7.69231 21.0002L9.23074 21.0001V22.5001H7.69231V21.0002Z"
                    fill="white"
                  />
                  <path
                    d="M7.69231 22.5001H9.23074V24H7.69231V22.5001Z"
                    fill="white"
                  />
                  <path
                    d="M9.23074 10.4991H10.7692V11.9992H9.23074V10.4991Z"
                    fill="white"
                  />
                  <path
                    d="M9.23074 11.9992H10.7692V13.499H9.23074V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M9.23074 13.499H10.7692V14.9989H9.23074V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M9.23074 21.0001H10.7692V22.5001H9.23074V21.0001Z"
                    fill="white"
                  />
                  <path
                    d="M9.23074 22.5001H10.7692V24H9.23074V22.5001Z"
                    fill="white"
                  />
                  <path
                    d="M10.7692 10.4991H12.3077V11.9992H10.7692V10.4991Z"
                    fill="white"
                  />
                  <path
                    d="M10.7692 11.9992H12.3077V13.499H10.7692V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M10.7692 13.499H12.3077V14.9989H10.7692V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M7.69228 17.683H9.23074V19.183H7.69228V17.683Z"
                    fill="white"
                  />
                  <path
                    d="M7.69228 19.183H9.23074V20.6829H7.69228V19.183Z"
                    fill="white"
                  />
                  <path
                    d="M7.69228 20.6829H9.23074V22.1827H7.69228V20.6829Z"
                    fill="white"
                  />
                  <path
                    d="M10.7692 17.683H12.3077V19.183H10.7692V17.683Z"
                    fill="white"
                  />
                  <path
                    d="M10.7692 19.183H12.3077V20.6829H10.7692V19.183Z"
                    fill="white"
                  />
                  <path
                    d="M10.7692 20.6829H12.3077V22.1827H10.7692V20.6829Z"
                    fill="white"
                  />
                  <path
                    d="M10.7692 21.0001H12.3077V22.5001H10.7692V21.0001Z"
                    fill="white"
                  />
                  <path
                    d="M10.7692 22.5001H12.3077V24H10.7692V22.5001Z"
                    fill="white"
                  />
                  <path
                    d="M12.3077 10.4991H13.8462V11.9992H12.3077V10.4991Z"
                    fill="white"
                  />
                  <path
                    d="M12.3077 11.9992H13.8462V13.499H12.3077V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M12.3077 13.499H13.8462V14.9989H12.3077V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M12.3077 15.0006H13.8462V16.5006H12.3077V15.0006Z"
                    fill="white"
                  />
                  <path
                    d="M12.3077 16.5006H13.8462V18.0005H12.3077V16.5006Z"
                    fill="white"
                  />
                  <path
                    d="M12.3077 18.0005H13.8462V19.5004H12.3077V18.0005Z"
                    fill="white"
                  />
                  <path
                    d="M12.3077 19.5004H13.8462V21.0002L12.3077 21.0001L12.3077 19.5004Z"
                    fill="white"
                  />
                  <path
                    d="M12.3077 21.0001L13.8462 21.0002V22.5001H12.3077V21.0001Z"
                    fill="white"
                  />
                  <path
                    d="M12.3077 22.5001H13.8462V24H12.3077V22.5001Z"
                    fill="white"
                  />
                  <path
                    d="M13.8462 10.4991H15.3846V11.9992H13.8462V10.4991Z"
                    fill="white"
                  />
                  <path
                    d="M13.8462 11.9992H15.3846V13.499H13.8462V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M13.8462 13.499H15.3846V14.9989H13.8462V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M13.8462 15.0006H15.3846V16.5006H13.8462V15.0006Z"
                    fill="white"
                  />
                  <path
                    d="M13.8462 16.5006H15.3846V18.0005H13.8462V16.5006Z"
                    fill="white"
                  />
                  <path
                    d="M13.8462 18.0005H15.3846V19.5004H13.8462V18.0005Z"
                    fill="white"
                  />
                  <path
                    d="M13.8462 19.5004H15.3846V21.0002H13.8462V19.5004Z"
                    fill="white"
                  />
                  <path
                    d="M13.8462 21.0002H15.3846V22.5001H13.8462V21.0002Z"
                    fill="white"
                  />
                  <path
                    d="M13.8462 22.5001H15.3846V24H13.8462V22.5001Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 10.4991H16.9231V11.9992H15.3846V10.4991Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 11.9992H16.9231V13.499H15.3846V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 13.499H16.9231V14.9989H15.3846V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 15.0006H16.9231V16.5006H15.3846V15.0006Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 16.5006H16.9231V18.0005H15.3846V16.5006Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 18.0005H16.9231V19.5004H15.3846V18.0005Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 19.5004H16.9231V21.0002H15.3846V19.5004Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 21.0002H16.9231V22.5001H15.3846V21.0002Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 22.5001H16.9231V24H15.3846V22.5001Z"
                    fill="white"
                  />
                  <path
                    d="M16.9231 10.4991H18.4615V11.9992H16.9231V10.4991Z"
                    fill="white"
                  />
                  <path
                    d="M16.9231 11.9992H18.4615V13.499H16.9231V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M16.9231 13.499H18.4615V14.9989H16.9231V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M16.9231 15.0006H18.4615V16.5006H16.9231V15.0006Z"
                    fill="white"
                  />
                  <path
                    d="M16.9231 16.5006H18.4615V18.0005H16.9231V16.5006Z"
                    fill="white"
                  />
                  <path
                    d="M16.9231 18.0005H18.4615V19.5004H16.9231V18.0005Z"
                    fill="white"
                  />
                  <path
                    d="M16.9231 19.5004H18.4615V21.0002H16.9231V19.5004Z"
                    fill="white"
                  />
                  <path
                    d="M16.9231 21.0002H18.4615V22.5001H16.9231V21.0002Z"
                    fill="white"
                  />
                  <path
                    d="M16.9231 22.5001H18.4615V24H16.9231V22.5001Z"
                    fill="white"
                  />
                  <path
                    d="M18.4615 10.4991H20V11.9992H18.4615V10.4991Z"
                    fill="white"
                  />
                  <path
                    d="M18.4615 11.9992H20V13.499H18.4615V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M18.4615 13.499H20V14.9989H18.4615V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M18.4615 15.0006H20V16.5006H18.4615V15.0006Z"
                    fill="white"
                  />
                  <path
                    d="M18.4615 16.5006H20V18.0005H18.4615V16.5006Z"
                    fill="white"
                  />
                  <path
                    d="M18.4615 18.0005H20V19.5004H18.4615V18.0005Z"
                    fill="white"
                  />
                  <path
                    d="M18.4615 19.5004H20V21.0002H18.4615V19.5004Z"
                    fill="white"
                  />
                  <path
                    d="M18.4615 21.0002H20V22.5001H18.4615V21.0002Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 8.99941H3.07692V10.4993H1.53843V8.99941Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 10.4993H3.07692V11.9992H1.53843V10.4993Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 11.9992H3.07692V13.499H1.53843V11.9992Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 13.499H3.07692V14.9989H1.53843V13.499Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 15.0006H3.07692V16.5006H1.53843V15.0006Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 16.5006H3.07692V18.0005H1.53843V16.5006Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 18.0005H3.07692V19.5004H1.53843V18.0005Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 19.5004H3.07692V21.0002H1.53843V19.5004Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 21.0002H3.07692V22.5001H1.53843V21.0002Z"
                    fill="white"
                  />
                  <path
                    d="M1.53843 22.5001H3.07692V24H1.53843V22.5001Z"
                    fill="white"
                  />
                  <path
                    d="M0 10.4991L1.53843 10.4993V11.9992H0V10.4991Z"
                    fill="white"
                  />
                  <path d="M0 11.9992H1.53843V13.499H0V11.9992Z" fill="white" />
                  <path d="M0 13.499H1.53843V14.9989H0V13.499Z" fill="white" />
                  <path
                    d="M0 15.0006H1.53843V16.5006H0V15.0006Z"
                    fill="white"
                  />
                  <path
                    d="M0 16.5006H1.53843V18.0005H0V16.5006Z"
                    fill="white"
                  />
                  <path
                    d="M0 18.0005H1.53843V19.5004H0V18.0005Z"
                    fill="white"
                  />
                  <path
                    d="M0 19.5004H1.53843V21.0002H0V19.5004Z"
                    fill="white"
                  />
                  <path
                    d="M0 21.0002H1.53843V22.5001H0V21.0002Z"
                    fill="white"
                  />
                  <path
                    d="M4.61536 2.9999H6.15385L6.15382 4.49977H4.61538L4.61536 2.9999Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 2.9999H13.8461L13.8462 4.49977H15.3846L15.3846 2.9999Z"
                    fill="white"
                  />
                  <path
                    d="M7.69228 1.50002H9.23074V2.9999H7.69231L7.69228 1.50002Z"
                    fill="white"
                  />
                  <path
                    d="M9.23074 0H10.7692V1.50002H9.23074V0Z"
                    fill="white"
                  />
                  <path
                    d="M9.23074 1.50002H10.7692V2.9999H9.23074V1.50002Z"
                    fill="white"
                  />
                  <path
                    d="M10.7692 0H12.3077V1.49988L10.7692 1.50002V0Z"
                    fill="white"
                  />
                  <path
                    d="M10.7692 1.50002L12.3077 1.49988V2.9999H10.7692V1.50002Z"
                    fill="white"
                  />
                  <path
                    d="M15.3846 4.49977H13.8462V5.99965H15.3846V4.49977Z"
                    fill="white"
                  />
                </svg>
                <p>Unlocked</p>
              </div>
              <div className="tip__content">
                <p className="content__title">Local Tip</p>
                <p className="tip__title">{challengeTip?.title}</p>
                <p className="tip__description">{challengeTip?.description}</p>
                <button
                  className="tip__close"
                  onClick={() => setTipActive(false)}>
                  Git it!
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Home;
