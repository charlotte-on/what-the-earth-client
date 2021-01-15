import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export class ProducerDescriptionPage extends Component {
  state = {
    producer: [],
  };

  componentDidMount() {
    apiHandler
      .getOneProducer(this.props.match.params.id)
      .then((producer) => {
        this.setState({ producer });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <img
              style={{ filter: "brightness(50%)" }}
              src="https://www.chapeaudepaille.fr/uploads/produits/poires/poires_large.jpg"
              alt={this.state.producer.companyName}
            />
          </div>
          <div>
            <p>{this.state.producer.companyName}</p>
            <p>{this.state.producer.formattedAddress}</p>
            <p>{this.state.producer.phoneNumber}</p>
          </div>
        </div>
        <p>{this.state.producer.type}</p>
        <p>Description : {this.state.producer.description}</p>
        <p>Horaires : {this.state.producer.schedule}</p>
        <Button variant="contained" startIcon={<PhoneIphoneIcon />}>
          {this.state.producer.phoneNumber}
        </Button>
        <Button variant="contained" startIcon={<EmailIcon />}>
          {this.state.producer.email}
        </Button>
        <h2>Où acheter ?</h2>
        <Map
          style="mapbox://styles/mapbox/light-v10"
          containerStyle={{
            height: "30vh",
            width: "100vw",
          }}
          // center={[2.390628, 48.851733]}
        >
          {/* <Marker
            key={this.state.producer._id}
            coordinates={this.state.producer.location.coordinates}
            anchor="bottom"
            style={{ backgroundColor: "white", border: "1px solid black" }}
          >
            <img
              style={{ width: "50px" }}
              src="../../../public/media/mapbox-icon.png"
              alt={this.state.producer.name}
            />
          </Marker> */}
        </Map>
        <h2>Avis</h2>
        <p>Commentaire 1 — le 01/01/2021</p>
        <p>Excellent !</p>
        <hr />
        <p>Commentaire 2 — le 02/01/2021</p>
        <p>Génial. :)</p>
      </div>
    );
  }
}

export default ProducerDescriptionPage;
