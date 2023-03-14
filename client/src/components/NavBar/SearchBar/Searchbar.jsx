import React from "react";
import style from "./Searchbar.module.css";
import { searchDog } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";

export default function Searchbar() {
  const dispatch = useDispatch();

  const [search, setSearch] = React.useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setSearch(value);
  };

  const handleButtonSearch = () => {
    setSearch("");
    dispatch(searchDog(search));
  };

  return (
    <div className={style.searchContainer}>
      <input
        type="text"
        placeholder="Search dog by race"
        className={style.input}
        onChange={handleInputChange}
      ></input>
      <button
        type="submit"
        onClick={handleButtonSearch}
        className={style.buttonSearch}
      >
        Search
      </button>
    </div>
  );
}
