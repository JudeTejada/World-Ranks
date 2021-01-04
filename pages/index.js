import Head from "next/head";
import { useState } from "react";


import styles from "../src/styles/Home.module.css";

import Layout from "../components/layout/Layout";
import SearchInput from "../components/searchInput/searchInput";
import CountriesTable from "../components/countriesTable/countriesTable";



export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.count}>Found {countries.length} countries</div>

        <div  className={styles.input}>
          <SearchInput
            placeholder="Filter by name,Region, Subregion"
            onChange={onInputChange}
          />
        </div>
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");

  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
