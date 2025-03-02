/* eslint-disable */
import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext"; // ✅ Importa il contesto
import Spinner from "./Spinner";
import CityItems from "./CityItems";
import styles from "./CityList.module.css";
import Message from "./Message";

function CityList() {
  const { cities, isLoading } = useContext(CitiesContext); // ✅ Ottieni i dati dal context

  if (isLoading) return <Spinner />;
  if (!cities || cities.length === 0) return <Message message="Add your first city by clicking on a city on the map please" />;

  return (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItems key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
