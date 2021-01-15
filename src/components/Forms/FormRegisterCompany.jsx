import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import Redirect from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class FormRegisterCompany extends Component {
  static contextType = UserContext;

  state = {
    companyName: "",
    producerName: "",
    email: "",
    password: "",
    phoneNumber: "",
    schedule: "",
    field: "",
    description: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .registerCompany(this.state)
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
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Nom du producteur"
          value={this.state.producerName}
          type="text"
          id="producerName"
          name="producerName"
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
