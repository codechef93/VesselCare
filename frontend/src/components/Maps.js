import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";
import "./../scss/maps.scss";

const Map = ({ location, zoomLevel }) => {
  return (
    <div className="map">
      <div className="tracking-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDvm7He9Kk1CelcqO6kEsvbVaWnP5oyl2w" }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
