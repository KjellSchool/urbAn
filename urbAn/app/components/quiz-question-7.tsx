import { useState } from "react";
import { useOutletContext } from "react-router";

import sunglassesImg from "../assets/images/image-sunglasses.png";
import headphonesImg from "../assets/images/image-headphones.png";
import backpackImg from "../assets/images/image-backpack.png";
import neckpillowImg from "../assets/images/image-neckpillow.png";
import cameraImg from "../assets/images/image-camera.png";
import postcardsImg from "../assets/images/image-postcards.png";
import notebookImg from "../assets/images/image-notebook.png";
import binocularsImg from "../assets/images/image-binoculars.png";
import shoppingImg from "../assets/images/image-shopping.png";
import spaImg from "../assets/images/image-spa.png";
import cardsImg from "../assets/images/image-cards.png";
import booksImg from "../assets/images/image-books.png";
import beerImg from "../assets/images/image-beer.png";
import matchaImg from "../assets/images/image-matcha.png";
import cocktailImg from "../assets/images/image-cocktail.png";
import coffeeImg from "../assets/images/image-coffee.png";

const SeventhQuestion = () => {
  const { setPendingAnswer } = useOutletContext();
  const [selected, setSelected] = useState([]);

  const options = [
    {
      label: "sunglasses",
      image: sunglassesImg,
      value: [
        { archetype: "moodboard", points: 1 },
        { archetype: "pinterest", points: 1 },
      ],
    },
    {
      label: "headphones",
      image: headphonesImg,
      value: [
        { archetype: "one_more", points: 1 },
        { archetype: "night", points: 1 },
      ],
    },
    {
      label: "backpack",
      image: backpackImg,
      value: [
        { archetype: "planner", points: 2 },
        { archetype: "lore", points: 1 },
      ],
    },
    {
      label: "neck pillow",
      image: neckpillowImg,
      value: [
        { archetype: "planner", points: 2 },
        { archetype: "nostalgia", points: 1 },
      ],
    },
    {
      label: "polaroid camera",
      image: cameraImg,
      value: [
        { archetype: "pinterest", points: 2 },
        { archetype: "moodboard", points: 2 },
      ],
    },
    {
      label: "postcards",
      image: postcardsImg,
      value: [
        { archetype: "nostalgia", points: 2 },
        { archetype: "lore", points: 1 },
      ],
    },
    {
      label: "notebook",
      image: notebookImg,
      value: [
        { archetype: "lore", points: 2 },
        { archetype: "planner", points: 1 },
      ],
    },
    {
      label: "binoculars",
      image: binocularsImg,
      value: [
        { archetype: "lore", points: 2 },
        { archetype: "moodboard", points: 1 },
      ],
    },
    {
      label: "shopping bags",
      image: shoppingImg,
      value: [
        { archetype: "pinterest", points: 2 },
        { archetype: "social", points: 1 },
      ],
    },
    {
      label: "spa treatment",
      image: spaImg,
      value: [
        { archetype: "planner", points: 2 },
        { archetype: "nostalgia", points: 1 },
      ],
    },
    {
      label: "deck of cards",
      image: cardsImg,
      value: [
        { archetype: "social", points: 2 },
        { archetype: "night", points: 1 },
      ],
    },
    {
      label: "books",
      image: booksImg,
      value: [
        { archetype: "lore", points: 2 },
        { archetype: "nostalgia", points: 1 },
      ],
    },
    {
      label: "beer",
      image: beerImg,
      value: [
        { archetype: "social", points: 2 },
        { archetype: "night", points: 1 },
      ],
    },
    {
      label: "matcha",
      image: matchaImg,
      value: [
        { archetype: "planner", points: 1 },
        { archetype: "moodboard", points: 2 },
      ],
    },
    {
      label: "cocktail",
      image: cocktailImg,
      value: [
        { archetype: "night", points: 2 },
        { archetype: "social", points: 2 },
      ],
    },
    {
      label: "coffee",
      image: coffeeImg,
      value: [
        { archetype: "planner", points: 2 },
        { archetype: "lore", points: 1 },
      ],
    },
  ];

  const toggleOption = (option) => {
    const isSelected = selected.includes(option.label);

    let updated;

    if (isSelected) {
      updated = selected.filter((l) => l !== option.label);
    } else {
      if (selected.length >= 5) return;
      updated = [...selected, option.label];
    }

    setSelected(updated);

    const payload = options
      .filter((o) => updated.includes(o.label))
      .flatMap((o) => o.value);

    setPendingAnswer(payload);
  };

  return (
    <>
      <p className="quiz__question">
        Build your perfect trip!
        <br />
        You can only pick 5.
      </p>

      <div className="question__grid">
        {options.map((option, i) => {
          const isActive = selected.includes(option.label);

          return (
            <button
              key={i}
              type="button"
              className={`image__option ${
                isActive ? "image__option--active" : ""
              }`}
              onClick={() => toggleOption(option)}>
              <img src={option.image} alt={option.label} />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default SeventhQuestion;
