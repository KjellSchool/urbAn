import { useState } from "react";
import { useOutletContext } from "react-router";

const SecondQuestion = () => {
  const { setPendingAnswer } = useOutletContext();
  const [selected, setSelected] = useState(null);

  const options = [
    {
      label: "Find something to do that fits the vibe",
      value: [
        { archetype: "unfollows", points: 2 },
        { archetype: "moodboard", points: 1 },
      ],
    },
    {
      label: "Find a cozy place to wait it out",
      value: [{ archetype: "healing", points: 2 }],
    },
    {
      label: "I dance in the rain, like life is a movie",
      value: [
        { archetype: "one_more", points: 2 },
        { archetype: "night", points: 2 },
      ],
    },
    {
      label: "Suck it up and stick to the plan",
      value: [
        { archetype: "planner", points: 2 },
      ],
    },
    {
      label: "Go inside for a drink",
      value: [
        { archetype: "one_more", points: 2 },
        { archetype: "night", points: 2 },
      ],
    },
    {
      label: "Ask someone where you can go",
      value: [
        { archetype: "social", points: 2 },
      ],
    },
  ];

  return (
    <>
      <p>You are exploring and it suddenly starts raining. What do you do?</p>
      <div className="question__options">
        {options.map((option, i) => (
          <label key={i}>
            <input type="radio" name="q2" onChange={() => {
              setSelected(option.value);
              setPendingAnswer(option.value);
            }}/>
            {option.label}
          </label>
        ))}
      </div>
    </>
  );
}

export default SecondQuestion;