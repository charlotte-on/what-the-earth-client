import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";
import AddIcon from "@material-ui/icons/Add";
import { withUser } from "../../components/Auth/withUser";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export class ProducerDescriptionPage extends Component {
  state = {
    producer: "",
    comments: [],
    rate: 1,
    review: "",
    producerId: this.props.match.params.id,
    userId: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    apiHandler
      .getOneProducer(this.props.match.params.id)
      .then((producer) => {
        this.setState({ producer });
      })
      .catch((err) => console.log(err));

    apiHandler
      .getComments(this.props.match.params.id)
      .then((comments) => {
        this.setState({ comments });
      })
      .catch((err) => console.log(err));

    console.log(this.props);
  }

  handleClickForm = () => {
    console.log("Hello");
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .postComment(this.state)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <img
              style={{ filter: "brightness(50%)" }}
              src="https://www.chapeaudepaille.fr/uploads/produits/poires/poires_large.jpg"
              alt="{this.state.producer.companyName}"
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<PhoneIphoneIcon />}
            href={"tel:" + this.state.producer.phoneNumber}
          >
            Appeler
          </Button>
          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            href={"mailto:" + this.state.producer.email}
          >
            Envoyer un email
          </Button>
        </div>
        <h2>Où acheter ?</h2>
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/light-v10"
          containerStyle={{
            height: "30vh",
            width: "100vw",
          }}
          // center={this.state.producer.location.coordinates}
        >
          {/* <Marker
            key={this.state.producer._id}
            // coordinates={this.state.producer.location.coordinates}
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
        {this.state.comments.map((comment) => (
          <div>
            <p>
              Par {comment.userId.firstName} — le{" "}
              {new Date(comment.createdAt).toDateString()}
            </p>
            <p>{comment.rate}/5</p>
            <p>{comment.review}</p>
            <hr />
          </div>
        ))}
        <Button
          onClick={this.handleClickForm}
          variant="contained"
          startIcon={<AddIcon />}
        >
          J'ajoute mon avis
        </Button>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <input value={this.state.review} name="review" type="text" />
          <select name="rate" id="rate">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <Button type="submit">Publier</Button>
        </form>
      </div>
    );
  }
}

export default withUser(ProducerDescriptionPage);
