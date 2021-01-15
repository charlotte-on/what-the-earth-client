import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LocationAutoComplete from "./LocationAutoComplete";

class FormRegisterCompany extends Component {
  static contextType = UserContext;

  state = {
    producerFirstName: "",
    producerLastName: "",
    companyName: "",
    phoneNumber: "",
    schedule: "",
    field: "",
    description: "",
    email: "",
    password: "",
    location: {
      coordinates: [],
    },
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlePlace = (place) => {
    const location = place.geometry;
    this.setState({ location, formattedAddress: place.place_name });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .registerProducer(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <form
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        className="center-column"
      >
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Nom de l'entreprise"
          value={this.state.companyName}
          type="text"
          id="companyName"
          name="companyName"
        />
        <LocationAutoComplete name="location" onSelect={this.handlePlace} />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Prénom"
          value={this.state.producerFirstName}
          type="text"
          id="producerFirstName"
          name="producerFirstName"
        />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Nom de famille"
          value={this.state.producerLastName}
          type="text"
          id="producerLastName"
          name="producerLastName"
        />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Email"
          value={this.state.email}
          type="email"
          id="email"
          name="email"
        />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Mot de passe"
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Numéro de téléphone"
          value={this.state.phoneNumber}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
        />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Horaires"
          value={this.state.schedule}
          type="text"
          id="schedule"
          name="schedule"
        />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Type"
          value={this.state.field}
          type="text"
          id="field"
          name="field"
        />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Description"
          value={this.state.description}
          type="text"
          id="description"
          name="description"
        />
        <Button style={{ margin: "10px" }} type="submit" variant="contained">
          Créer entreprise
        </Button>
      </form>
    );
  }
}

export default withRouter(FormRegisterCompany);
