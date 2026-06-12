import { useState } from "react";
import { useOutletContext } from "react-router";

const ThirdQuestion = () => {
  const { setPendingAnswer } = useOutletContext();
  const [selected, setSelected] = useState(null);

  const options = [
    {
      label: "I don’t know where to go",
      value: [
        { archetype: "unfollows", points: 2 },
      ],
    },
    {
      label: "I don’t know what to do",
      value: [{ archetype: "wander", points: 2 }],
    },
    {
      label: "There goes my planning",
      value: [
        { archetype: "planner", points: 2 },
        { archetype: "unfollows", points: 1 },
      ],
    },
    {
      label: "I can’t take any pictures",
      value: [
        { archetype: "pinterest", points: 2 },
      ],
    },
    {
      label: "I can’t tell anyone how nice it is here",
      value: [
        { archetype: "social", points: 2 },
        { archetype: "moodboard", points: 1 },
      ],
    },
    {
      label: "I didn’t even notice",
      value: [
        { archetype: "one_more", points: 2 },
        { archetype: "wander", points: 1 },
        { archetype: "night", points: 1 },
      ],
    },
  ];

  return (
    <>
      <p>You are exploring and it suddenly starts raining. What do you do?</p>
      <div className="question__options">
        {options.map((option, i) => (
          <label key={i}>
            <input type="radio" name="q3" onChange={() => {
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

export default ThirdQuestion;