import { useState } from "react";
import { useOutletContext } from "react-router";

const FirstQuestion = () => {
  const { setPendingAnswer } = useOutletContext();
  const [selected, setSelected] = useState(null);

  const options = [
    {
      label: "I guess I'm going there now",
      value: [
        { archetype: "one_more", points: 2 },
        { archetype: "unfollows", points: 2 },
      ],
    },
    {
      label: "I'll check it out later",
      value: [{ archetype: "planner", points: 2 }],
    },
    {
      label: "Can you give me some lore?",
      value: [
        { archetype: "lore", points: 2 },
        { archetype: "nostalgia", points: 1 },
      ],
    },
    {
      label: "Ask who else hangs out there",
      value: [{ archetype: "social", points: 2 }],
    },
    {
      label: "Can I take pictures there?",
      value: [
        { archetype: "pinterest", points: 2 },
        { archetype: "moodboard", points: 1 },
      ],
    },
    {
      label: "Ask who else hangs out there",
      value: [
        { archetype: "night", points: 2 },
        { archetype: "moodboard", points: 1 },
      ],
    },
  ];

  return (
    <>
      <div>
        <p className="quiz__question">
          A local gives you an unexpected
          <br />
          recommendation. What do you do?
        </p>
        <div className="question__options">
          {options.map((option, i) => (
            <label className="question__option" key={i}>
              <input
                type="radio"
                name="q1"
                onChange={() => {
                  setSelected(option.value);
                  setPendingAnswer(option.value);
                }}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default FirstQuestion;
