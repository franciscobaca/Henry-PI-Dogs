import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions/actions";
import Cards from "../../components/CardsContainer/Cards";
import Paginado from "../../components/Paginado/Paginado";
import style from "./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";

function Home() {
  const dispatch = useDispatch();
  const { currentPage, dogs } = useSelector((state) => state);
  //----------------------------------------------------------------//
  const [dogsPerPage, setDogPerPage] = useState(8);
  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexFirstDog, indexLastDog);

  React.useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div className={style.home}>
      <NavBar />
      <Paginado
        totalDogs={dogs.length}
        dogsPerPage={dogsPerPage}
        currentPage={currentPage}
      />
      <Cards dogs={currentDogs} />
      <footer className={style.footer}>Copyright© Francisco Baca</footer>
    </div>
  );
}

export default Home;
