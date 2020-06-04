import React, { Fragment, useRef, useState, useEffect } from "react";

const fectPlace = (place, setApiResult, apiUrl = "ffxf") => {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((result) => {
      setApiResult(result);
    })
    .catch((err) => {
      console.log("Fetch Error", err);
    });
};

const App = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalNames, setHospitalNames] = useState([]);
  const hospitalList = useRef();
  const [apiResult, setApiResult] = useState("");
  useEffect(() => {
    fectPlace(hospitalName, setApiResult);
  }, []);

  const handleHospitalSearch = (e) => {
    e.preventDefault();

    setHospitalNames((prevState) => [...prevState, hospitalName]);
    setHospitalName("");
    fectPlace(hospitalName, setApiResult);
  };

  const myResultList = hospitalNames.map((hospital, index) => (
    <li key={index}>{hospital}</li>
  ));

  return (
    <Fragment>
      <h2>Get the latest hospital in your proximity</h2>
      <form onSubmit={handleHospitalSearch}>
        <input
          type="text"
          placeholder="Search hospital"
          onChange={(e) => {
            const { value } = e.target;
            setHospitalName(value);
          }}
          value={hospitalName}
        />
        <button>Search Hospital</button>
      </form>
      <ul ref={hospitalList}>{myResultList}</ul>
      <p>Api search result:</p>
      <pre>{JSON.stringify(apiResult, null, 2)}</pre>
    </Fragment>
  );
};

export default App;
