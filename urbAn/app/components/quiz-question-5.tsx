import { useState } from "react";
import { useOutletContext } from "react-router";

const FifthQuestion = () => {
  const { setPendingAnswer } = useOutletContext();
  const [selected, setSelected] = useState(null);

  const options = [
    {
      label: "Everything went smooth, no stress.",
      value: [{ archetype: "planner", points: 2 }],
    },
    {
      label: "I made a life-long friend.",
      value: [{ archetype: "social", points: 2 }],
    },
    {
      label: "I never partied so hard in my life!",
      value: [
        { archetype: "one_more", points: 2 },
        { archetype: "night", points: 2 },
      ],
    },
    {
      label: "Plans changed and you wouldn’t believe what happened...",
      value: [
        { archetype: "unfollows", points: 2 },
        { archetype: "one_more", points: 2 },
      ],
    },
    {
      label: "I found something the locals didn’t even know about.",
      value: [
        { archetype: "lore", points: 2 },
        { archetype: "wander", points: 1 },
      ],
    },
    {
      label: "My city-trip video went viral!",
      value: [
        { archetype: "pinterest", points: 2 },
        { archetype: "moodboard", points: 1 },
      ],
    },
  ];

  return (
    <>
      <div>
        <p className="quiz__question">
          Which travel story sounds
          <br />
          best to you?
        </p>
        <div className="question__options">
          {options.map((option, i) => (
            <label className="question__option" key={i}>
              <input
                type="radio"
                name="q5"
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

export default FifthQuestion;
