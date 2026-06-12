import { useState } from "react";
import { useOutletContext } from "react-router";

const FourthQuestion = () => {
  const { setPendingAnswer } = useOutletContext();
  const [selected, setSelected] = useState(null);

  const options = [
    {
      label: "Let's go out and see what happens",
      value: [
        { archetype: "unfollows", points: 2 },
        { archetype: "wander", points: 2 },
      ],
    },
    {
      label: "Schedule lots of things to do",
      value: [{ archetype: "planner", points: 2 }],
    },
    {
      label: "Time to explore",
      value: [
        { archetype: "lore", points: 2 },
        { archetype: "wander", points: 2 },
      ],
    },
    {
      label: "Shopping time",
      value: [{ archetype: "treasures", points: 2 }],
    },
    {
      label: "Lazy day, time to find a spot to relax",
      value: [{ archetype: "healing", points: 2 }],
    },
    {
      label: "Find something cool to photograph",
      value: [{ archetype: "pinterest", points: 2 }],
    },
  ];

  return (
    <>
      <div>
        <p className="quiz__question">
          You have a free afternoon.
          <br />
          What do you do?
        </p>
        <div className="question__options">
          {options.map((option, i) => (
            <label className="question__option" key={i}>
              <input
                type="radio"
                name="q4"
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

export default FourthQuestion;
