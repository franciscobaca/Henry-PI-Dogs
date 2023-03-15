import style from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ name, image, temperament, weight, id }) {
  return (
    <div className={style.cardContainer}>
      <div>
        <Link to={`/home/${id}`}>
          <img
            src={image}
            width="275px"
            height="175px"
            className={style.dogImage}
            alt=""
          />
        </Link>
      </div>
      <div className={style.cardInfo}>
        <Link to={`/home/${id}`} className={style.dogBreedLink}>
          <h3 className={style.dogBreed}>{name}</h3>
        </Link>
        <Link to={`/home/${id}`} className={style.dogBreedLink}>
          <p className={style.temperaments}>{temperament}</p>
        </Link>
        <Link to={`/home/${id}`} className={style.dogBreedLink}>
          <p className={style.weightRange}>Weight Range: {weight} kg</p>
        </Link>
      </div>
    </div>
  );
}

export default Card;
