import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import Redirect from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
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
        className="center-column"
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      >
        <TextField
          value={this.state.firstName}
          label="Prénom"
          type="text"
          id="firstName"
          name="firstName"
          variant="outlined"
          style={{ margin: "10px" }}
        />
        <TextField
          value={this.state.lastName}
          label="Nom de famille"
          type="text"
          id="lastName"
          name="lastName"
          variant="outlined"
          style={{ margin: "10px" }}
        />
        <TextField
          value={this.state.email}
          label="Email"
          type="email"
          id="email"
          name="email"
          variant="outlined"
          style={{ margin: "10px" }}
        />
        <TextField
          value={this.state.password}
          label="Mot de passe"
          type="password"
          id="password"
          name="password"
          variant="outlined"
          style={{ margin: "10px" }}
        />
        <Button style={{ margin: "10px" }} type="submit" variant="contained">
          S'inscrire
        </Button>
      </form>
    );
  }
}

export default withRouter(FormSignup);
