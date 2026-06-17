import { useEffect, useState } from "react";

import { Link } from "react-router";

import { useUser } from "../contexts/userContext.tsx";

import { getProfiles, getProfile } from "../database/profiles.js";
import { getArchetype } from "../database/archetypes.js";
import { getCompletedRoutesForUser } from "../database/routes.js";
import { getRoute } from "../database/routes.js";

import {
  getChallenge,
  getCompletedChallenges,
} from "../database/challenges.js";

import { getConcludedMeetups } from "../database/meetup.js";

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userAge, setUserAge] = useState(0);

  const { currentUser } = useUser();

  console.log(currentUser);

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

  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [challenges, setChallenges] = useState([]);

  const loadCompletedChallenges = async () => {
    const { data: challengeProgress, error } = await getCompletedChallenges(
      currentUser?.profile_id,
    );

    let challenges = [];

    challengeProgress.forEach(async (progress) => {
      const { data: challenge, error: challengeError } = await getChallenge(
        progress?.challenge_id,
      );

      challenges.push(challenge);
    });

    console.log(challenges);
    setCompletedChallenges(challengeProgress);
    setChallenges(challenges);
  };

  const [concludedMeetups, setConcludedMeetups] = useState([]);
  const [meetupPeople, setMeetupPeople] = useState([]);

  const loadConcludedMeetups = async () => {
    const { data: meetups, error } = await getConcludedMeetups(
      currentUser?.profile_id,
    );

    setConcludedMeetups(meetups);

    let people = [];

    meetups?.forEach(async (meetup) => {
      if (meetup.sender_id !== currentUser?.profile_id) {
        const { data: sender, error } = await getProfile(meetup.sender_id);

        people.push(sender);
      }

      if (meetup.receiver_id !== currentUser?.profile_id) {
        const { data: receiver, error } = await getProfile(meetup.receiver_id);

        people.push(receiver);
      }
    });

    console.log(people);
    setMeetupPeople(people);
  };

  useEffect(() => {
    if (!currentUser) return;

    loadProfiles();
    loadCompletedChallenges();
    loadConcludedMeetups();
  }, [currentUser]);

  return (
    <>
      <div className="profile">
        <header className="profile__header">
          <div className="profile__navigation">
            <Link to={`/home`} className="profile__navigation--back">
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.7188 16.1562C11.8958 16.3333 11.9844 16.5469 11.9844 16.7969C11.9844 17.0365 11.8958 17.2448 11.7188 17.4219L10.2344 18.9062C10.0573 19.0833 9.84375 19.1719 9.59375 19.1719C9.35417 19.1719 9.14583 19.0833 8.96875 18.9062L0.28125 10.2188C0.09375 10.0312 0 9.81771 0 9.57812C0 9.32812 0.09375 9.11979 0.28125 8.95312L8.96875 0.265625C9.14583 0.0885417 9.35417 0 9.59375 0C9.84375 0 10.0573 0.0885417 10.2344 0.265625L11.7188 1.75C11.8958 1.92708 11.9844 2.14062 11.9844 2.39062C11.9844 2.63021 11.8958 2.83854 11.7188 3.01562L5.14062 9.57812L11.7188 16.1562Z"
                  fill="black"
                />
              </svg>
            </Link>
            <Link to={`/settings`} className="button--profile">
              <svg
                width="49"
                height="49"
                viewBox="0 0 49 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_1499_4058)">
                  <path
                    d="M13.8337 38.7653L12.5244 40.53L7.51466 40.3593L5.8068 38.993L6.09145 33.3571L7.11616 32.6739L7.0023 29.0874L6.2053 28.1196L2.56188 26.6964L1.13867 25.6148L1.93567 20.0927L2.84652 19.1819L6.03452 17.9864L7.68544 16.9047L7.05923 13.489L5.4083 12.4074L6.43302 6.9992L7.05923 5.63291L12.6951 5.97448L14.0614 7.62541L17.3063 6.88534L18.5018 5.8037L19.5266 2.84342L20.2097 1.36328L25.504 1.59099L27.2119 2.72956L28.1227 5.91756L29.2044 7.45462L32.5062 7.22691L33.7587 5.68984L38.7114 6.03141L40.8178 7.34077L40.4193 12.749L38.4837 13.8875L39.1669 16.7909L40.3054 18.7834L43.038 18.9542L44.9166 20.5482L44.4612 25.8425L43.4934 27.0949L40.4762 27.8919L38.9961 29.1444L38.5976 29.5429L38.7684 32.3893L40.647 33.7556L41.1024 35.4634L39.9639 39.0499L39.3377 40.0746L38.9392 40.7578L33.8725 40.8147L33.1325 39.8469L32.8478 39.2776L32.6201 38.6514L30.9692 38.4806L29.0336 39.2207L27.6104 40.53L27.3827 42.6364L25.561 45.2551H21.5191L20.2666 44.3442L18.7296 43.2626L18.3311 40.3593L16.794 38.7653H13.8337Z"
                    fill="#D8D7C3"
                  />
                  <rect
                    x="4.40234"
                    y="6.60547"
                    width="2.20123"
                    height="2.20123"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 41.8232 6.60547)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 39.6221 41.8242)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(1 0 0 -1 4.40234 39.6211)"
                    fill="black"
                  />
                  <rect
                    x="13.207"
                    y="4.40234"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 13.207 4.40234)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 1 1 0 33.0186 4.40234)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 41.8232 33.0195)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 13.207 41.8242)"
                    fill="black"
                  />
                  <rect
                    x="26.415"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 26.415 0)"
                    fill="black"
                  />
                  <rect
                    x="46.2256"
                    y="26.4141"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(180 46.2256 26.4141)"
                    fill="black"
                  />
                  <rect
                    x="19.8105"
                    y="46.2266"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(-90 19.8105 46.2266)"
                    fill="black"
                  />
                  <rect
                    y="19.8125"
                    width="2.20123"
                    height="2.20123"
                    fill="black"
                  />
                  <rect
                    x="15.4082"
                    y="19.8125"
                    width="2.20123"
                    height="2.20123"
                    fill="black"
                  />
                  <rect
                    x="26.415"
                    y="15.4102"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 26.415 15.4102)"
                    fill="black"
                  />
                  <rect
                    x="30.8174"
                    y="26.4141"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(180 30.8174 26.4141)"
                    fill="black"
                  />
                  <rect
                    x="19.8105"
                    y="30.8164"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(-90 19.8105 30.8164)"
                    fill="black"
                  />
                  <rect
                    x="17.6094"
                    y="17.6094"
                    width="2.20123"
                    height="2.20123"
                    fill="black"
                  />
                  <rect
                    x="28.6162"
                    y="17.6094"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 28.6162 17.6094)"
                    fill="black"
                  />
                  <rect
                    x="28.6162"
                    y="28.6172"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(180 28.6162 28.6172)"
                    fill="black"
                  />
                  <rect
                    x="17.6094"
                    y="28.6172"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(-90 17.6094 28.6172)"
                    fill="black"
                  />
                  <rect
                    x="17.6094"
                    y="6.60547"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 17.6094 6.60547)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 1 1 0 28.6162 6.60547)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 39.6221 28.6172)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 17.6094 39.6211)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 1 1 0 39.6221 17.6094)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 28.6162 39.6211)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 6.60352 28.6172)"
                    fill="black"
                  />
                  <rect
                    x="19.8105"
                    y="6.60547"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(180 19.8105 6.60547)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(1 0 0 -1 26.415 6.60547)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 1 1 0 39.6221 26.4141)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 19.8105 39.6211)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 6.60352 19.8125)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(1 0 0 -1 37.4209 17.6094)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 1 1 0 28.6162 37.4219)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 8.80469 28.6172)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 8.80469 13.207)"
                    fill="black"
                  />
                  <rect
                    x="4.40234"
                    y="8.80469"
                    width="2.20123"
                    height="2.20123"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 41.8232 8.80469)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 37.4209 41.8242)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(1 0 0 -1 4.40234 37.4219)"
                    fill="black"
                  />
                  <rect
                    x="11.0059"
                    y="4.40234"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 11.0059 4.40234)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 1 1 0 35.2197 4.40234)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 41.8232 35.2188)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 11.0059 41.8242)"
                    fill="black"
                  />
                  <rect
                    x="24.2139"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 24.2139 0)"
                    fill="black"
                  />
                  <rect
                    x="46.2256"
                    y="24.2148"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(180 46.2256 24.2148)"
                    fill="black"
                  />
                  <rect
                    x="22.0127"
                    y="46.2266"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(-90 22.0127 46.2266)"
                    fill="black"
                  />
                  <rect
                    y="22.0117"
                    width="2.20123"
                    height="2.20123"
                    fill="black"
                  />
                  <rect
                    x="15.4082"
                    y="22.0117"
                    width="2.20123"
                    height="2.20123"
                    fill="black"
                  />
                  <rect
                    x="24.2139"
                    y="15.4102"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 24.2139 15.4102)"
                    fill="black"
                  />
                  <rect
                    x="30.8174"
                    y="24.2148"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(180 30.8174 24.2148)"
                    fill="black"
                  />
                  <rect
                    x="22.0117"
                    y="30.8164"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(-90 22.0117 30.8164)"
                    fill="black"
                  />
                  <rect
                    x="15.4082"
                    y="6.60547"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 15.4082 6.60547)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 1 1 0 30.8174 6.60547)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 39.6221 30.8164)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 15.4082 39.6211)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 1 1 0 41.8232 17.6094)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 28.6162 41.8242)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 4.40234 28.6172)"
                    fill="black"
                  />
                  <rect
                    x="19.8105"
                    y="4.40234"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(180 19.8105 4.40234)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(1 0 0 -1 26.415 4.40234)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 1 1 0 41.8232 26.4141)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 19.8105 41.8242)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 4.40234 19.8125)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(1 0 0 -1 37.4209 15.4102)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 1 1 0 30.8174 37.4219)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 8.80469 30.8164)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 8.80469 15.4102)"
                    fill="black"
                  />
                  <rect
                    x="4.40234"
                    y="11.0078"
                    width="2.20123"
                    height="2.20123"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 41.8232 11.0078)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 35.2197 41.8242)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(1 0 0 -1 4.40234 35.2188)"
                    fill="black"
                  />
                  <rect
                    x="8.80469"
                    y="4.40234"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 8.80469 4.40234)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 1 1 0 37.4209 4.40234)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(-1 0 0 1 41.8232 37.4219)"
                    fill="black"
                  />
                  <rect
                    width="2.20123"
                    height="2.20123"
                    transform="matrix(0 -1 -1 0 8.80469 41.8242)"
                    fill="black"
                  />
                  <rect
                    x="22.0127"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 22.0127 0)"
                    fill="black"
                  />
                  <rect
                    x="46.2256"
                    y="22.0117"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(180 46.2256 22.0117)"
                    fill="black"
                  />
                  <rect
                    x="24.2139"
                    y="46.2266"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(-90 24.2139 46.2266)"
                    fill="black"
                  />
                  <rect
                    y="24.2148"
                    width="2.20123"
                    height="2.20123"
                    fill="black"
                  />
                  <rect
                    x="15.4082"
                    y="24.2148"
                    width="2.20123"
                    height="2.20123"
                    fill="black"
                  />
                  <rect
                    x="22.0117"
                    y="15.4102"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(90 22.0117 15.4102)"
                    fill="black"
                  />
                  <rect
                    x="30.8174"
                    y="22.0117"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(180 30.8174 22.0117)"
                    fill="black"
                  />
                  <rect
                    x="24.2139"
                    y="30.8164"
                    width="2.20123"
                    height="2.20123"
                    transform="rotate(-90 24.2139 30.8164)"
                    fill="black"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_1499_4058"
                    x="0"
                    y="0"
                    width="48.2256"
                    height="48.2266"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="2" dy="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1499_4058"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1499_4058"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </Link>
          </div>
          <h2 className="profile__title">Profile</h2>
        </header>
        <main className="profile__main">
          <div className="profile__info">
            <div className="info__avatar">
              <img src={currentUser?.avatar} alt="avatar" />
            </div>
            <div className="info__personal">
              <p className="personal__name">{currentUser?.name}</p>
              <p
                className="archetype-tag"
                style={{ backgroundColor: `#${primaryArchetype?.colour}` }}>
                {primaryArchetype?.tag}
              </p>
            </div>
          </div>
          <div className="profile__stats">
            <div className="profile__gender">
              <p className="info__stat--data">{currentUser?.gender}</p>
              <p className="info__stat--label">Gender</p>
            </div>
            <div className="profile__age">
              <p className="info__stat--data">{userAge}</p>
              <p className="info__stat--label">Age</p>
            </div>
            <div className="profile__country">
              <p className="info__stat--data">{currentUser?.nationality}</p>
              <p className="info__stat--label">Nationality</p>
            </div>
          </div>
          <div className="profile__description">
            <h3 className="description__title">"</h3>
            <p className="description__text">{currentUser?.description}</p>
          </div>
          <div className="profile__achievements">
            <h2 className="achievements__title">Your Achievements</h2>
            <div className="achievements__container">
              <details className="achievements__item">
                <summary>
                  <span className="achievement__stat stat--pink">
                    {completedRoutes.length}
                  </span>{" "}
                  Routes
                </summary>
                <ul>
                  {completedRoutes.map((completedRoute) => (
                    <li
                      className="achievement__entry entry--pink"
                      key={completedRoute?.route_id}>
                      {completedRoute?.title}
                    </li>
                  ))}
                </ul>
              </details>
              <details className="achievements__item">
                <summary>
                  <span className="achievement__stat stat--blue">
                    {completedChallenges?.length}
                  </span>{" "}
                  Side Quests
                </summary>
                <ul>
                  {challenges.map((challenge) => (
                    <li
                      className="achievement__entry entry--blue"
                      key={challenge?.challenge_id}>
                      {challenge?.title}
                    </li>
                  ))}
                </ul>
              </details>
              <details className="achievements__item">
                <summary>
                  <span className="achievement__stat stat--green">
                    {meetupPeople?.length}
                  </span>
                  Meetups
                </summary>
                <ul>
                  {meetupPeople.map((person) => (
                    <li
                      className="achievement__entry entry--green"
                      key={person?.profile_id}>
                      {person?.name}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
