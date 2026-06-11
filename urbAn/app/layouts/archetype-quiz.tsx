import { useState } from "react";
import { Outlet, Link, useSearchParams, useLocation } from "react-router";

const ArchetypeQuiz = () => {
  const url = useLocation();
  const lastChar = url.pathname.substring(url.pathname.length - 1);
  const currentPage = parseInt(lastChar);

  const [quizQuestionNumber, setQuizQuestionNumber] = useState(currentPage);

  const pageDown = () => {
    setQuizQuestionNumber(quizQuestionNumber - 1);
  };

  const pageUp = () => {
    if (pendingAnswer) {
      addPoints(pendingAnswer);
      setPendingAnswer(null);
    }

    setQuizQuestionNumber(quizQuestionNumber + 1);
  };

  const [pendingAnswer, setPendingAnswer] = useState(null);

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
    return archetypeScores.sort((a, b) => b.points - a.points)[0];
  };

  const winner = getWinner();
  console.log(winner);

  return (
    <>
      <h2>TITLEEEEEEEEEEEE</h2>
      <Outlet context={{ setPendingAnswer, pendingAnswer, addPoints }}></Outlet>
      <div>
        {quizQuestionNumber > 1 ? (
          quizQuestionNumber > 5 ? (
            <>
              <Link to={`/question-${quizQuestionNumber - 1}`}>
                <button onClick={pageDown}>Previous</button>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/question-${quizQuestionNumber - 1}`}>
                <button onClick={pageDown}>Previous</button>
              </Link>
              <Link to={`/question-${quizQuestionNumber + 1}`}>
                <button onClick={pageUp}>Next</button>
              </Link>
            </>
          )
        ) : (
          <Link to={`/question-${quizQuestionNumber + 1}`}>
            <button onClick={pageUp}>Next</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default ArchetypeQuiz;
