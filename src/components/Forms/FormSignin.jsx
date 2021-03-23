import React, { Component } from "react";
import { UserContext } from "../Auth/UserContext";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const style = {
  background: "#87a878",
  color: "white",
};

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
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
          style={{ margin: "10px" }}
          id="outlined-email-input"
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          autoComplete="username"
        />
        <TextField
          style={{ margin: "10px" }}
          id="outlined-password-input"
          label="Mot de passe"
          type="password"
          name="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <Button style={style} type="submit" variant="contained">
          Se connecter
        </Button>
      </form>
    );
  }
}

export default withRouter(FormSignin);
