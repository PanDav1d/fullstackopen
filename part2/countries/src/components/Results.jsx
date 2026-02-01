import axios from "axios";
import { useState, useEffect } from "react";

const Results = ({ results, setSearchTerm }) => {
  const [capitalTemperature, setCapitalTemperature] = useState(null);

  const handleViewDetails = (countryTitle) => {
    setSearchTerm(countryTitle);
  };

  const getWeather = (location) => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=XXX&query=${location}`,
      )
      .then((response) => {
        setCapitalTemperature(response.data.current.temperature);
      });
  };

  useEffect(() => {
    if (results.length === 1) {
      getWeather(results[0].capital);
    }
  }, [results]);

  if (results.length === 1) {
    const country = results[0];

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>

        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>

        <img src={country.flags.png} />

        <h2>Weather in {country.capital}</h2>
        <p>
          temperature{" "}
          {capitalTemperature !== null
            ? `${capitalTemperature} C`
            : "loading..."}
        </p>
      </div>
    );
  }

  return (
    <div>
      {results.length > 10
        ? "Too many matches, specify please"
        : results.map((result) => (
            <div key={result.name.common}>
              {result.name.common}{" "}
              <button onClick={() => handleViewDetails(result.name.common)}>
                Show
              </button>
            </div>
          ))}
    </div>
  );
};

export default Results;
