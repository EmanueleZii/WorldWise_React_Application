/* eslint-disable */
import { useContext,createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const BASE_URL = `http://localhost:9000`;

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState({});


  const fetchCities = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/cities`);
      if (!res.ok) throw new Error("Failed to fetch cities");
      const data = await res.json();
      setCities(data || []); 
    } catch (err) {
      setError(err.message);
      setCities([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);


 async function getCity(id){
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error("Failed to fetch cities");
      const data = await res.json();
      setCurrentCity(data || []); 
    } catch (err) {
      setError(err.message);
      setCurrentCity([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, error, fetchCities }}>
      {children}
    </CitiesContext.Provider>
  );
}

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("useContext must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, CitiesContext, useCities };
