import React, { Fragment } from "react";
import GoogleMapReact from "google-map-react";

const MapContainer = () => {
  const SG_COOR = { lat: "99", lng: "12345" };
  return (
    <Fragment>
      <h1>MapContainer Loaded</h1>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyAn6KqtG5IxmjoyGNY3Bh6KvLkXWZ5k45E",
          libraries: ["places", "directions"],
        }}
        defaultZoom={11}
        defaultCenter={{ lat: SG_COOR.lat, lng: SG_COOR.lng }}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)} // "maps" is the mapApi. Bad naming but that's their library.
      >
        {/* Pin markers on the Map*/}
        {/*markers.map((marker, key) => {
        const { name, lat, lng } = marker;
        return <MapMarker key={key} name={name} lat={lat} lng={lng} />;
      })*/}
      </GoogleMapReact>
    </Fragment>
  );
};

export default MapContainer;
