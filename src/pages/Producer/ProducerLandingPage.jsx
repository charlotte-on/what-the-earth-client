import React, { Component } from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
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
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/light-v10"
          containerStyle={{
            height: "80vh",
            width: "100vw",
          }}
          center={[2.3315, 48.8567]}
        >
          {this.state.allProducers.map((producer) => (
            <Marker
              key={producer._id}
              coordinates={producer.location.coordinates}
              offsetTop={-48}
              offsetLeft={-24}
              onClick={() => {
                if (this.state.selectedProducer === null) {
                  this.setState({ selectedProducer: producer });
                } else {
                  this.setState({ selectedProducer: null });
                }
              }}
            >
              <img
                style={{ width: "40px" }}
                src="/media/marker.png"
                alt={producer.companyName}
              />
            </Marker>
          ))}
          {this.state.selectedProducer !== null && (
            <Popup
              coordinates={this.state.selectedProducer.location.coordinates}
              offset={{
                "bottom-left": [12, -38],
                bottom: [0, -38],
                "bottom-right": [-12, -38],
              }}
            >
              <p>{this.state.selectedProducer.companyName}</p>
              <p>{this.state.selectedProducer.field}</p>
              <p>{this.state.selectedProducer.formattedAddress}</p>
              <Link
                className="link-underlined"
                to={`/producers/${this.state.selectedProducer._id}`}
              >
                Je découvre
              </Link>
            </Popup>
          )}
        </Map>
        {this.state.allProducers.map((producer) => (
          <div className="card" key={producer._id}>
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
