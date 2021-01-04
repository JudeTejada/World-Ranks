import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import styles from "./countriesTable.module.css";

import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";

const orderBy = (countries, value, direction) => {
  console.log(countries);
  if (direction === "asc") {
    return [...countries.sort((a, b) => (a[value] > b[value] ? 1 : -1))];
  }

  if (direction === "desc") {
    return [...countries.sort((a, b) => (a[value] > b[value] ? -1 : 1))];
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return (
      <div className={styles.heading__arow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading__arow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

function CountriesTable({ countries }) {
  const [direction, setDirection] = useState("asc");
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) return <> </>;

    if (direction === "asc") return setDirection("desc");
    if (direction === "desc") return setDirection("asc");
  };

  const setValueAndDirection = (value) => {
    console.log(value);
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading__flag}></div>
        <button
          className={styles.heading__name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading__population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading__area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          {value === "area" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading__area}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>
          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`}>
          <div className={styles.row} key={country.name}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
            <div className={styles.area}>{country.area || 0}</div>
            <div className={styles.gini}>{country.gini || 0}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CountriesTable;
