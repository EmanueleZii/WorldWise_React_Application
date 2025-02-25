/* eslint-disable */

import Spinner from './Spinner';
import CityItems from './CityItems';
import styles from './CityList.module.css';
import Message from './Message';

 function CityList({ cities, isLoading }) {
 
  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message="Add you first city by clicking on a city on the map please" />

  return (
    <ul className={styles.CityList}>
        {cities.map((city) => (
             <CityItems key={city.id} city={city} />
         ))};

    </ul>
  );

}

export default  CityList;
