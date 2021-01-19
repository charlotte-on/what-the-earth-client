import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import LocationAutoComplete from "./LocationAutoComplete";

class FormEditCompany extends Component {
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
    location: {
      coordinates: [],
    },
    formattedAddress: "",
  };

  componentDidMount() {
    apiHandler
      .getOneProducer(this.props.match.params.id)
      .then((data) => {
        this.setState({
          producerFirstName: data.producerFirstName,
          producerLastName: data.producerLastName,
          companyName: data.companyName,
          phoneNumber: data.phoneNumber,
          schedule: data.schedule,
          field: data.field,
          description: data.description,
          email: data.email,
          location: {
            coordinates: data.location.coordinates,
          },
          formattedAddress: data.formattedAddress,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          httpResponse: {
            status: "failure",
            message: "Failure, please try again later",
          },
        });
      });
  }

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
      .updateProducer(this.props.match.params.id, this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (!this.context.user) {
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
        <FormControl style={{ margin: "10px" }} variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
          <Select
            style={{ width: "195px" }}
            id="field"
            name="field"
            value={this.state.field}
            label="Type"
            onChange={this.handleChange}
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            <MenuItem value={"Fromager"}>Fromager</MenuItem>
            <MenuItem value={"Boucher"}>Boucher</MenuItem>
            <MenuItem value={"Maraîcher"}>Maraîcher</MenuItem>
          </Select>
        </FormControl>
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
          Mettre à jour mon entreprise
        </Button>
      </form>
    );
  }
}

export default withRouter(FormEditCompany);
