import { useState } from "react";
import { useOutletContext } from "react-router";

const SixthQuestion = () => {
  const { setPendingAnswer } = useOutletContext();
  const [selected, setSelected] = useState(null);

  const options = [
    {
      label: "I reserved but couldn’t make it",
      value: [{ archetype: "planner", points: 2 }],
    },
    {
      label: "I was alone the whole time",
      value: [{ archetype: "social", points: 2 }],
    },
    {
      label: "Having to cancel things i planned",
      value: [
        { archetype: "one_more", points: 2 },
        { archetype: "unfollows", points: 2 },
      ],
    },
    {
      label: "Missing out on an easter egg",
      value: [
        { archetype: "lore", points: 2 },
        { archetype: "wander", points: 2 },
      ],
    },
    {
      label: "Not being able to show people my trip",
      value: [{ archetype: "pinterest", points: 2 }],
    },
    {
      label: "Coming home without a souvenir",
      value: [{ archetype: "treasures", points: 2 }],
    },
  ];

  return (
    <>
      <div>
        <p className="quiz__question">
          Which situation would disappoint
          <br />
          you the most?
        </p>
        <div className="question__options">
          {options.map((option, i) => (
            <label className="question__option" key={i}>
              <input
                type="radio"
                name="q6"
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

export default SixthQuestion;
