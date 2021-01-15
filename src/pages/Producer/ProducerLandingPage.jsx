import React, { Component } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export class ProducerLandingPage extends Component {
  state = {
    allProducers: [],
    selectedProducer: null,
  };

  componentDidMount() {
    document.title = "What the Earth — Les producteurs";
    apiHandler
      .getProducers()
      .then((producers) => {
        this.setState({ allProducers: producers });
      })
      .catch((err) => console.log(err));
  }

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
        >
          {this.state.allProducers.map((producer) => (
            <Marker
              key={producer._id}
              coordinates={producer.location.coordinates}
              anchor="bottom"
              style={{ backgroundColor: "white", border: "1px solid black" }}
              onClick={() => {
                if (this.state.selectedProducer === null) {
                  this.setState({ selectedProducer: producer });
                } else {
                  this.setState({ selectedProducer: null });
                }
              }}
            >
              <img
                style={{ width: "50px" }}
                src="../../../public/media/mapbox-icon.png"
                alt={producer.name}
              />
            </Marker>
          ))}
        </Map>
        {this.state.allProducers.map((producer) => (
          <div>
            <Link className="link-underlined" to={`/producers/${producer._id}`}>
              {producer.companyName}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default ProducerLandingPage;
