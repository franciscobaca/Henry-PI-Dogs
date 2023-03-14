import React from "react";
import style from "./Paginado.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions/actions";

export default function Paginado({ dogsPerPage, totalDogs }) {
  const pageNumbers = [];
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);

  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.paginado}>
      {pageNumbers.map((number, index) => {
        return (
          <button
            onClick={() => dispatch(setCurrentPage(number))}
            key={index}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}
