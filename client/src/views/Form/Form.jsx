import React from "react";
import style from "./Form.module.css";
import { getTemperaments, postDog } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTemperaments = useSelector((state) => state.temperaments);

  React.useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [errors, setErrors] = React.useState({});

  const [input, setInput] = React.useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    lifeSpan: "",
    image: "",
    temperament: [],
  });

  const validate = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "Must be a name";
    }

    if (input.name && !/^[a-zA-Z]*$/.test(input.name)) {
      errors.name = "The name can not contain numbers or special caracters";
    }

    if (!input.height_min || input.height_min <= 0) {
      errors.height_min = "The min height must be bigger";
    }
    if (!input.height_max || input.height_max <= 0) {
      errors.height_max = "The max height must be bigger";
    }

    if (parseInt(input.height_min) >= parseInt(input.height_max)) {
      errors.especial1 =
        "The height min can not be bigger or equal than the max height";
    }

    if (parseInt(input.weight_min) >= parseInt(input.weight_max)) {
      errors.especial2 =
        "The weight min can not be bigger or equal than the max weight";
    }

    if (input.height) {
      if (!/^[0-9]*$/) {
        errors.height = "It must be only numbers";
      }
    }
    if (!input.weight_min || input.weight_min <= 0) {
      errors.weight_min = "The min weight must be bigger";
    }

    if (input.weight_min) {
      if (input.weight_max) {
        if (!/^[0-9]*$/) {
          errors.weight_min = "It must be only numbers";
        }
      }
    }

    if (!input.weight_max || input.weight_max <= 0) {
      errors.weight_max = "The max weight must be bigger";
    }
    if (input.weight_max) {
      if (!/^[0-9]*$/) {
        errors.weight_max = "It must be only numbers";
      }
    }

    if (!input.lifeSpan || Number(input.Span) <= 0) {
      errors.lifeSpan = "The life span must be grather";
    }
    if (input.lifeSpan) {
      if (!/^[0-9]*$/) {
        errors.lifeSpan = "It must be only numbers";
      }
    }

    return errors;
  };

  const changeHandler = (event) => {
    let property = event.target.name;
    let value = event.target.value;
    setInput({
      ...input,
      [property]: value,
    });
    setErrors(
      validate({
        ...input,
        [property]: value,
      })
    );
  };

  const resetTemperamentsHandler = () => {
    setInput({
      ...input,
      temperament: [],
    });
  };

  const selectHandler = (event) => {
    setInput({
      ...input,
      temperament: [...input.temperament, event.target.value],
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      errors.name ||
      errors.height_min ||
      errors.height_max ||
      errors.weight_min ||
      errors.weight_max ||
      errors.lifeSpan
    ) {
      alert("Some data is wrong or missing");
    } else {
      dispatch(postDog(input));
      alert("The dog was created");
      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        lifeTime: "",
        temperament: [],
      });
      history.push("/home");
    }
  };

  return (
    <div className={style.container}>
      <Link to="/home">
        <button className={style.buttonBack}>GO BACK</button>
      </Link>
      <form onSubmit={submitHandler} className={style.formContainer}>
        <div className={style.nameContainer}>
          <label name="name">Name: </label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={changeHandler}
            className={errors.name ? style.wrongInput : ""}
          />
          {errors.name && (
            <span className={style.spanError}>{errors.name}</span>
          )}
        </div>

        <div>
          <label name="height_min">Height Min: </label>
          <input
            type="text"
            name="height_min"
            value={input.height_min}
            onChange={changeHandler}
            className={errors.height_min && style.wrongInput}
          />
          {errors.height_min && (
            <span className={style.spanError}>{errors.height_min}</span>
          )}
        </div>

        <div>
          <label name="height_max">Height Max: </label>
          <input
            type="text"
            name="height_max"
            value={input.height_max}
            onChange={changeHandler}
            className={errors.height_max && style.wrongInput}
          />
          {errors.height_max && (
            <span className={style.spanError}>{errors.height_max}</span>
          )}
        </div>

        <div>
          <label name="weight_min">Weight Min: </label>
          <input
            type="text"
            name="weight_min"
            value={input.weight_min}
            onChange={changeHandler}
          />
          {errors.weight_min && (
            <span className={style.spanError}>{errors.weight_min}</span>
          )}
        </div>

        <div>
          <label name="weight_max">Weight Max: </label>
          <input
            type="text"
            name="weight_max"
            value={input.weight_max}
            onChange={changeHandler}
          />
          {errors.weight_max && (
            <span className={style.spanError}>{errors.weight_max}</span>
          )}
        </div>

        <div>
          <label name="lifeSpan">LifeSpan: </label>
          <input
            type="text"
            name="lifeSpan"
            value={input.lifeSpan}
            onChange={changeHandler}
          />
          {errors.lifeSpan && (
            <span className={style.spanError}>{errors.lifeSpan}</span>
          )}
        </div>

        <div>
          <label name="image">Image: </label>
          <input
            type="text"
            name="image"
            value={input.image}
            placeholder="Paste image link here..."
            onChange={changeHandler}
          ></input>
        </div>

        <div>
          <label className={style.temperamentLabel}>Temperaments: </label>
          <select onChange={selectHandler} className={style.selectTemps}>
            {allTemperaments.length &&
              allTemperaments.map((t) => {
                return <option value={t.name}>{t.name}</option>;
              })}
          </select>
        </div>

        <div className={style.temperamentContainer}>
          {input.temperament.map((t, i) => {
            return <div className={style.temp}>{t}</div>;
          })}
        </div>

        <div>
          {input.temperament.length > 0 ? (
            <button
              onClick={resetTemperamentsHandler}
              className={style.buttonReset}
            >
              Reset Temperaments
            </button>
          ) : (
            <></>
          )}
        </div>

        <button className={style.buttonCreate} type="submit">
          CREATE
        </button>
      </form>
      <div className={style.titleForm}>{`< CREATE YOUR DOG >`}</div>
    </div>
  );
}

export default Form;
