import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";

function Cards(props) {
  return (
    <div className={style.cardsContainer}>
      {props.dogs &&
        props.dogs.map((dog) => {
          return (
            <Card
              key={dog.id}
              id={dog.id}
              image={dog.image}
              name={dog.name}
              temperament={dog.temperament}
              weight={dog.weight}
            />
          );
        })}
    </div>
  );
}

export default Cards;
