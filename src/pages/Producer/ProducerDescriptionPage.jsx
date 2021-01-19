import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";
import AddIcon from "@material-ui/icons/Add";
import { withUser } from "../../components/Auth/withUser";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Moment from "react-moment";
import "moment-timezone";

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
    visibilityForm: "none",
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
  }

  starsRating = (rating) => {
    if (rating === 1) {
      return <p>★☆☆☆☆</p>;
    } else if (rating === 2) {
      return <p>★★☆☆☆</p>;
    } else if (rating === 3) {
      return <p>★★★☆☆</p>;
    } else if (rating === 4) {
      return <p>★★★★☆</p>;
    } else if (rating === 5) {
      return <p>★★★★★</p>;
    } else {
      return null;
    }
  };

  handleClickForm = () => {
    if (this.state.visibilityForm === "none") {
      this.setState({ visibilityForm: "flex" });
    } else {
      this.setState({ visibilityForm: "none" });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .postComment(this.state)
      .then((data) => {
        console.log(data);
        // const dataFormatted = { ...data };
        // console.log(dataFormatted);
        // dataFormatted.userId.firstName = "Test";
        this.setState({ comments: [...this.state.comments, data] });
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ review: "", rate: 1 });
  };

  render() {
    if (!this.state.producer) {
      return (
        <img src="/media/loading.gif" alt="loading icon" className="loading" />
      );
    }
    return (
      <div>
        <div style={{ position: "relative" }}>
          <img
            style={{ filter: "brightness(50%)" }}
            src="https://www.chapeaudepaille.fr/uploads/produits/poires/poires_large.jpg"
            alt={this.state.producer.companyName}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0%",
              left: "0%",
              color: "white",
              margin: "0 0 10px 10px",
            }}
          >
            <h2>{this.state.producer.companyName}</h2>
            <p>{this.state.producer.field}</p>
          </div>
        </div>
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
        <h2 style={{ textAlign: "center", margin: "10px" }}>Où acheter ?</h2>
        <p>{this.state.producer.formattedAddress}</p>
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/light-v10"
          containerStyle={{
            height: "30vh",
            width: "100vw",
          }}
          center={this.state.producer.location.coordinates}
        >
          <Marker
            key={this.state.producer._id}
            coordinates={this.state.producer.location.coordinates}
            anchor="bottom"
          >
            <img
              style={{ width: "50px" }}
              src="/media/marker.png"
              alt={this.state.producer.companyName}
            />
          </Marker>
        </Map>
        <h2 style={{ textAlign: "center", margin: "10px" }}>Avis</h2>
        {/* {!this.state.comments ? <p>Pas d'avis pour le moment</p> : null} */}
        {this.state.comments.map((comment) => (
          <div className="card">
            <p>
              Par {comment.userId.firstName} — le{" "}
              <Moment format="DD/MM/YYYY">{comment.createdAt}</Moment>
            </p>
            {this.starsRating(comment.rate)}
            <p>{comment.review}</p>
          </div>
        ))}
        {this.props.context.isLoggedIn && !this.props.context.producer ? (
          <div className="center-column">
            <Button
              onClick={this.handleClickForm}
              variant="contained"
              startIcon={<AddIcon />}
            >
              J'ajoute mon avis
            </Button>
            <form
              className="center-column"
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              style={{ display: this.state.visibilityForm }}
            >
              <TextField
                id="outlined-multiline-static"
                label="Commentaire"
                name="review"
                multiline
                rows={4}
                variant="outlined"
                value={this.state.review}
                style={{ margin: "10px" }}
              />
              <FormControl style={{ margin: "10px" }} variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Note
                </InputLabel>
                <Select
                  style={{ width: "195px" }}
                  id="rate"
                  name="rate"
                  label="Note"
                  onChange={this.handleChange}
                  value={this.state.rate}
                >
                  <MenuItem value={1}>★☆☆☆☆</MenuItem>
                  <MenuItem value={2}>★★☆☆☆</MenuItem>
                  <MenuItem value={3}>★★★☆☆</MenuItem>
                  <MenuItem value={4}>★★★★☆</MenuItem>
                  <MenuItem value={5}>★★★★★</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit">Publier</Button>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withUser(ProducerDescriptionPage);
