import React, { Fragment, useRef, useState, useEffect } from "react";
import { Counter } from "./components/Counter";
import { LoginForm } from "./components/LoginForm";
import MapContainer from "./components/MapContainer";

const fectPlace = (place, setApiResult, apiUrl) => {
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
  const apiKey = "AIzaSyAn6KqtG5IxmjoyGNY3Bh6KvLkXWZ5k45E";
  const googleapis = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${hospitalName}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${apiKey}`;

  let test = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURI(
    hospitalName
  )}&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:9000@47.6918452,-122.2226413&key=${apiKey}`;
  test = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURI(
    hospitalName
  )}&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&key=${apiKey}`;

  useEffect(() => {
    fectPlace(hospitalName, setApiResult, test);
  }, []);

  const handleHospitalSearch = (e) => {
    e.preventDefault();

    setHospitalNames((prevState) => [...prevState, hospitalName]);
    setHospitalName("");
    fectPlace(hospitalName, setApiResult, test);
  };

  const myResultList = hospitalNames.map((hospital, index) => (
    <li key={index}>{hospital}</li>
  ));
  // console.log("see process env below");
  // console.log(process.env);

  return (
    <Fragment>
      <LoginForm />
      {/* <h2>Get the latest hospital in your proximity</h2> */}
      {/* <MapContainer />
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
      <pre>{JSON.stringify(apiResult, null, 2)}</pre> */}
      <Counter />
    </Fragment>
  );
};

export default App;
