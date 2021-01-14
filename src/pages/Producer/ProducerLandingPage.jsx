import React, { Component } from "react";
import ReactMapboxGl, { Layer } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export class ProducerLandingPage extends Component {
  render() {
    return (
      <div>
        <h2>Les producteurs locaux</h2>
        <Map
          style="mapbox://styles/mapbox/light-v10"
          containerStyle={{
            height: "50vh",
            width: "100vw",
          }}
          center={[2.3315, 48.8567]}
        ></Map>
      </div>
    );
  }
}

export default ProducerLandingPage;
