import { Link } from "react-router-dom";
import Searchbar from "./SearchBar/Searchbar";
import style from "./NavBar.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterByTemperaments,
  filterByCreate,
  filterByName,
  filterByWeight,
  setCurrentPage,
} from "../../redux/actions/actions";

function NavBar() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const allDogs = useSelector((state) => state.dogs);

  React.useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const filterByOrder = (event) => {
    let value = event.target.value;
    dispatch(filterByName(value));
    setCurrentPage(1);
  };

  const filterByCreated = (event) => {
    let value = event.target.value;
    dispatch(filterByCreate(value));
    setCurrentPage(1);
  };

  const filterTemperamentHandler = (event) => {
    let value = event.target.value;
    dispatch(filterByTemperaments(value));
    setCurrentPage(1);
  };

  const filterWeightHandler = (event) => {
    let value = event.target.value;
    dispatch(filterByWeight(value));
    setCurrentPage(1);
  };

  const reloadCharacters = (event) => {
    event.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
  };

  return (
    <div className={style.container}>
      <div>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <p className={style.homeLink} onClick={reloadCharacters}>
            HOME
          </p>
        </Link>
      </div>

      <div className={style.createLinkContainer}>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <p className={style.createDogLink}>CREATE DOG</p>
        </Link>
      </div>
      <Searchbar />
      <div className={style.filterContainer}>
        <select onChange={filterTemperamentHandler} className={style.filters}>
          {temperaments.map((temperament, index) => {
            return (
              <option key={index} value={temperament.name}>
                {temperament.name}
              </option>
            );
          })}
        </select>

        <select onChange={filterByCreated} className={style.filters}>
          <option value="all">All</option>
          <option value="api">Existing</option>
          <option value="created">Created</option>
        </select>

        <select onChange={filterByOrder} className={style.filters}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select onChange={filterWeightHandler} className={style.filters}>
          <option value="minWeigth">Min Weigth</option>
          <option value="maxWeight">Max Weigth</option>
        </select>
        <button onClick={reloadCharacters} className={style.reloadButton}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default NavBar;
