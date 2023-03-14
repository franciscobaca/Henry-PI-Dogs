import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.landingContainer}>
      <h1
        className={style.landingTitle}
      >{`< WELCOME TO MY DOG'S BREED WIKI >`}</h1>
      <Link to="/home">
        <button className={style.buttonToHome}>LET'S CHECK IT OUT</button>
      </Link>
    </div>
  );
}
