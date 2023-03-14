import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions/actions";
import Cards from "../../components/CardsContainer/Cards";
import Paginado from "../../components/Paginado/Paginado";
import style from "./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";

function Home() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const { currentPage, dogs } = useSelector((state) => state);
  const [order, setOrder] = React.useState("");
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
    </div>
  );
}

export default Home;
