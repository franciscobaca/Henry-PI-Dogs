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

    //Name Validations
    if (!input.name) {
      errors.name = "Empty field";
    }

    if (input.name && /^[a-zA-Z]*$/.test(input.name)) {
      if (input.name.length >= 30) {
        errors.name = "Name is too long";
      }
    }

    if (input.name && !/^[a-zA-Z\s]*$/.test(input.name)) {
      errors.name = "Numbers and special characters are not allowed";
    }

    //Height Validations
    if (input.height_min && !/^[0-9]*$/.test(input.height_min)) {
      errors.height_min = "Only numbers allowed";
    }

    if (!input.height_min || input.height_min <= 0) {
      errors.height_min = "Empty field";
    }

    if (input.height_min && /^[0-9]*$/.test(input.height_min)) {
      if (Number(input.height_min) >= 1000) {
        errors.height_min = "Dogs are not that big...";
      }
    }

    if (!input.height_max || input.height_max <= 0) {
      errors.height_max = "Empty field";
    }
    if (input.height_max && !/^[0-9]*$/.test(input.height_max)) {
      errors.height_max = "Only numbers allowed";
    }

    if (input.height_max && /^[0-9]*$/.test(input.height_max)) {
      if (Number(input.height_max) >= 1000) {
        errors.height_max = "Dogs are not that big...";
      }
    }

    if (input.height_min) {
      if (input.height_max) {
        if (Number(input.height_min) >= Number(input.height_max)) {
          errors.height_max =
            "Maximum Height cannot be lower than Minimum Height";
        }
      }
    }

    //Weight Validations

    if (!input.weight_min || input.weight_min <= 0) {
      errors.weight_min = "Empty field";
    }

    if (input.weight_min && !/^[0-9]*$/.test(input.weight_min)) {
      errors.weight_min = "Only numbers allowed";
    }

    if (input.weight_min && /^[0-9]*$/.test(input.weight_min)) {
      if (Number(input.weight_min) >= 1000) {
        errors.weight_min = "Dogs don't weight that much...";
      }
    }

    if (!input.weight_max || input.weight_max <= 0) {
      errors.weight_max = "Empty field";
    }

    if (input.weight_max && !/^[0-9]*$/.test(input.weight_max)) {
      errors.weight_max = "Only numbers allowed";
    }

    if (input.weight_max && /^[0-9]*$/.test(input.weight_max)) {
      if (Number(input.weight_max >= 1000)) {
        errors.weight_max = "Dogs don't weight that much...";
      }
    }

    if (input.weight_min && input.weight_max) {
      if (Number(input.weight_min) >= Number(input.weight_max)) {
        errors.weight_max =
          "Maximum weight cannot be lower than Minimum Weight";
      }
    }

    //Life Span Validations

    if (!input.lifeSpan) {
      errors.lifeSpan = "Empty field";
    }

    if (input.lifeSpan) {
      if (!/^[0-9]*$/.test(input.lifeSpan)) {
        errors.lifeSpan = "Only numbers allowed";
      }
    }

    if (input.lifeSpan && /^[0-9]*$/.test(input.lifeSpan)) {
      if (Number(input.lifeSpan) < 1) {
        errors.lifeSpan = "Lifespan cannot be lower than 1";
      }
    }

    if (input.lifeSpan && /^[0-9]*$/.test(input.lifeSpan)) {
      if (Number(input.lifeSpan) >= 1000) {
        errors.lifeSpan = "Dogs don't live that long...";
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
      !input.name ||
      !input.height_min ||
      !input.height_max ||
      !input.weight_min ||
      !input.weight_max ||
      !input.lifeSpan ||
      !input.temperament.length ||
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
          <label name="name">NAME: </label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={changeHandler}
          />
          {errors.name && (
            <span className={style.spanError}>{errors.name}</span>
          )}
        </div>

        <div>
          <label name="height_min">HEIGHT MIN: </label>
          <input
            type="text"
            name="height_min"
            value={input.height_min}
            onChange={changeHandler}
          />
          {errors.height_min && (
            <span className={style.spanError}>{errors.height_min}</span>
          )}
        </div>

        <div>
          <label name="height_max">HEIGHT MAX: </label>
          <input
            type="text"
            name="height_max"
            value={input.height_max}
            onChange={changeHandler}
          />
          {errors.height_max && (
            <span className={style.spanError}>{errors.height_max}</span>
          )}
        </div>

        <div>
          <label name="weight_min">WEIGHT MIN: </label>
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
          <label name="weight_max">WEIGHT MAX: </label>
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
          <label name="lifeSpan">LIFESPAN: </label>
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
          <label name="image">IMAGE: </label>
          <input
            type="text"
            name="image"
            value={input.image}
            placeholder="Paste image link here..."
            onChange={changeHandler}
          ></input>
        </div>

        <div>
          <label className={style.temperamentLabel}>TEMPERAMENTS: </label>
          <select onChange={selectHandler} className={style.selectTemps}>
            <option value="" selected disabled hidden>
              Choose temperaments
            </option>
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
