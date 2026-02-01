import { useState, useEffect } from "react";
import axios from "axios";
import Results from "./components/Results";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [foundCountry, setFoundCountry] = useState({});

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setAllCountries(response.data);
        setResults(response.data);
      });
  }, []);

  useEffect(() => {
    setResults(
      allCountries.filter((country) =>
        country.name.common.toLowerCase().match(searchTerm),
      ),
    );
  }, [searchTerm]);

  const handleSeachTermChange = (event) => setSearchTerm(event.target.value);

  return (
    <>
      <div>
        find countries{" "}
        <input value={searchTerm} onChange={handleSeachTermChange} />
      </div>
      <div>
        <Results results={results} />
      </div>
    </>
  );
}

export default App;
