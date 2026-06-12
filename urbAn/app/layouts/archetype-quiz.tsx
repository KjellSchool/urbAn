import { useState } from "react";
import {
  Outlet,
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router";

import { insertProfile } from "../database/profiles.js";

import { useUser } from "../contexts/userContext.tsx";

const ArchetypeQuiz = () => {
  const { setCurrentUser } = useUser();

  const navigate = useNavigate();

  const url = useLocation();
  const lastChar = url.pathname.substring(url.pathname.length - 1);
  const currentPage = parseInt(lastChar);

  const [quizQuestionNumber, setQuizQuestionNumber] = useState(currentPage);

  const pageDown = () => {
    setQuizQuestionNumber(quizQuestionNumber - 1);
  };

  const pageUp = () => {
    if (quizQuestionNumber === 1) {
      console.log(pendingUser);
    } else {
      if (pendingAnswer) {
        addPoints(pendingAnswer);
        setPendingAnswer(null);
      }
      console.log(pendingUser);
    }

    setQuizQuestionNumber(quizQuestionNumber + 1);
  };

  const [pendingUser, setPendingUser] = useState({
    username: "",
    birthday: "",
    description: "",
    archetype: null,
  });

  const [pendingAnswer, setPendingAnswer] = useState(null);
  const [finalWinner, setFinalWinner] = useState(null);

  const [archetypeScores, setArchetypeScores] = useState([
    {
      id: "052863e6-ebf2-4867-bbeb-76c7c28b1d07",
      archetype: "lore",
      points: 0,
    },
    {
      id: "61c78c2c-ceb1-48d3-bbd9-29f2c2ccd9a3",
      archetype: "one_more",
      points: 0,
    },
    {
      id: "c7d23af7-9a6a-4d79-a24b-f2259c79106e",
      archetype: "moodboard",
      points: 0,
    },
    {
      id: "64462c5e-6d10-4c53-9e3d-8576e6384d72",
      archetype: "pinterest",
      points: 0,
    },
    {
      id: "9b331ae3-4a0e-4244-85de-2b7120ce8c7f",
      archetype: "unfollows",
      points: 0,
    },
    {
      id: "42e9d978-5cba-4536-871e-d5ce8799c479",
      archetype: "social",
      points: 0,
    },
    {
      id: "ae04fc0b-08e6-478c-9bb7-a794fb160989",
      archetype: "healing",
      points: 0,
    },
    {
      id: "ff0d08dc-2c23-4bbd-ab34-804dd31e4cd1",
      archetype: "planner",
      points: 0,
    },
    {
      id: "3891e7a6-4736-41bc-af3c-da86b5cc6ea9",
      archetype: "wander",
      points: 0,
    },
    {
      id: "50865f75-a8d4-4a67-8397-74e5d5deccfd",
      archetype: "nostalgia",
      points: 0,
    },
    {
      id: "e8ebccf4-1ed2-4ce2-834c-67f90c63f691",
      archetype: "night",
      points: 0,
    },
    {
      id: "a49e6547-f5ad-4b4b-af15-b568b4fd75d6",
      archetype: "treasures",
      points: 0,
    },
  ]);

  const addPoints = (updates) => {
    setArchetypeScores((prev) =>
      prev.map((item) => {
        const match = updates.find((u) => u.archetype === item.archetype);

        if (!match) return item;

        return {
          ...item,
          points: item.points + match.points,
        };
      }),
    );
  };

  const getWinner = () => {
    return [...archetypeScores].sort((a, b) => b.points - a.points)[0];
  };

  const finalizeOnboarding = () => {
    const winner = getWinner();

    setFinalWinner(winner);

    setPendingUser((prev) => ({
      ...prev,
      archetype: winner.id,
    }));

    return winner;
  };

  const submitOnboarding = async () => {
    const winner = getWinner();

    const finalUser = {
      ...pendingUser,
      archetype: winner.id,
    };

    setPendingUser(finalUser);

    const { data: newProfile, error } = await insertProfile(
      finalUser.username,
      finalUser.birthday,
      finalUser.description,
      finalUser.archetype,
    );

    console.log(newProfile, error);
    setCurrentUser(newProfile);

    navigate("/home");
  };

  const loadingPositions = [
    3.6084, 32.481, 61.353, 90.2251, 119.098, 147.97, 176.841, 206,
  ];

  return (
    <>
      <div className="quiz__layout">
        <h2 className="quiz__title">
          <span>{currentPage} / 8 complete</span>
          <svg
            width="237"
            height="36"
            viewBox="0 0 237 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_1153_2177" fill="white">
              <rect width="237" height="36" rx="2" />
            </mask>
            <rect
              width="237"
              height="36"
              rx="2"
              stroke="#2EFFA5"
              stroke-width="4.81203"
              mask="url(#path-1-inside-1_1153_2177)"
            />
            {loadingPositions.slice(0, currentPage).map((x, index) => (
              <rect
                x={x}
                y="3.60547"
                width="27.6692"
                height="28.8722"
                fill="url(#paint0_linear_1153_2177)"
              />
            ))}
            <defs>
              <linearGradient
                id="paint0_linear_1153_2177"
                x1="17.443"
                y1="3.60547"
                x2="17.443"
                y2="32.4776"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#2EFFA5" />
                <stop offset="1" stop-color="#00E081" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1153_2177"
                x1="46.3155"
                y1="3.60547"
                x2="46.3155"
                y2="32.4776"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#2EFFA5" />
                <stop offset="1" stop-color="#00E081" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_1153_2177"
                x1="75.1876"
                y1="3.60547"
                x2="75.1876"
                y2="32.4776"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#2EFFA5" />
                <stop offset="1" stop-color="#00E081" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_1153_2177"
                x1="104.06"
                y1="3.60547"
                x2="104.06"
                y2="32.4776"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#2EFFA5" />
                <stop offset="1" stop-color="#00E081" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_1153_2177"
                x1="132.932"
                y1="3.60547"
                x2="132.932"
                y2="32.4776"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#2EFFA5" />
                <stop offset="1" stop-color="#00E081" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_1153_2177"
                x1="161.804"
                y1="3.60547"
                x2="161.804"
                y2="32.4776"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#2EFFA5" />
                <stop offset="1" stop-color="#00E081" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_1153_2177"
                x1="190.676"
                y1="3.60547"
                x2="190.676"
                y2="32.4776"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#2EFFA5" />
                <stop offset="1" stop-color="#00E081" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_1153_2177"
                x1="219.835"
                y1="3.60547"
                x2="219.835"
                y2="32.4776"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#2EFFA5" />
                <stop offset="1" stop-color="#00E081" />
              </linearGradient>
            </defs>
          </svg>
        </h2>
        <Outlet
          context={{
            setPendingUser,
            pendingUser,
            setPendingAnswer,
            pendingAnswer,
          }}></Outlet>
        <div className="quiz__buttons">
          {quizQuestionNumber > 1 ? (
            quizQuestionNumber > 6 ? (
              <>
                <Link
                  className="quiz__navigation"
                  to={`/question-${quizQuestionNumber - 1}`}>
                  <button onClick={pageDown}>Previous</button>
                </Link>
                {/* <Link to={``}> */}
                <button className="quiz__navigation" onClick={submitOnboarding}>
                  Finish
                </button>
                {/* </Link> */}
              </>
            ) : (
              <>
                <Link
                  className="quiz__navigation"
                  to={`/question-${quizQuestionNumber - 1}`}>
                  <button onClick={pageDown}>Back</button>
                </Link>
                <Link
                  className="quiz__navigation"
                  to={`/question-${quizQuestionNumber + 1}`}>
                  <button onClick={pageUp}>Next</button>
                </Link>
              </>
            )
          ) : (
            <Link
              className="quiz__navigation"
              to={`/question-${quizQuestionNumber + 1}`}>
              <button onClick={pageUp}>Next</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ArchetypeQuiz;
