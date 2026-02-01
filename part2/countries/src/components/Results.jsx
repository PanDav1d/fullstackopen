const Results = ({ results }) => {
  if (results.length === 1) {
    const country = results[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
      </div>
    );
  }
  return (
    <div>
      {results.length > 10
        ? "Too many matches, specify please"
        : results.map((result) => (
            <p key={result.name.common}>{result.name.common}</p>
          ))}
    </div>
  );
};

export default Results;
