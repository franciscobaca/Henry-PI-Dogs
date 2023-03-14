import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDetail, clearDetail, deleteDog } from "../../redux/actions/actions";
import style from "./Detail.module.css";

function Detail(props) {
  const dispatch = useDispatch();
  const history = useHistory;

  React.useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const dogDetail = useSelector((state) => state.dogDetail);

  const clearData = () => {
    dispatch(clearDetail());
  };

  const deleteDog = () => {
    dispatch(deleteDog(props.match.params.id));
    history.push("/home");
  };

  return (
    <div className={style.detailContainer}>
      <div>
        <Link to="/home">
          <button className={style.buttonBack} onClick={clearData}>
            Go back!
          </button>
        </Link>
      </div>
      {dogDetail.length > 0 ? (
        <div className={style.container}>
          <div className={style.details}>
            <h1>Breed: {dogDetail[0].name} </h1>
            <h2>Temperaments: {dogDetail[0].temperament}</h2>
            <h2>Height: {dogDetail[0].height} cm</h2>
            <h2>Weight: {dogDetail[0].weight} kg</h2>
            <h2>Life Span: {dogDetail[0].lifeSpan}</h2>
            <div className={style.buttonsContainer}>
              <button className={style.buttonDelete} onClick={deleteDog}>
                DELETE
              </button>
              <button className={style.buttonUpdate}>UPDATE</button>
            </div>
          </div>
          <div className={style.imgContainer}>
            <img
              src={dogDetail[0].image}
              alt=""
              className={style.img}
              height="500px"
              width="500px"
            />
          </div>
        </div>
      ) : (
        <p className={style.loading}>Loading...</p>
      )}
    </div>
  );
}

export default Detail;
