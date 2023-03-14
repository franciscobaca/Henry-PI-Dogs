import style from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ name, image, temperament, weight, id }) {
  return (
    <div className={style.cardContainer}>
      <div>
        <img
          src={image}
          width="275px"
          height="175px"
          className={style.dogImage}
          alt=""
        />
      </div>
      <div className={style.cardInfo}>
        <Link to={`/home/${id}`} className={style.dogBreedLink}>
          <h3 className={style.dogBreed}>{name}</h3>
        </Link>
        <p className={style.temperaments}>{temperament}</p>
        <p className={style.weightRange}>Weight Range: {weight} kg</p>
      </div>
    </div>
  );
}

export default Card;
