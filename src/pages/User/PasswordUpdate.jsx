import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import "../../styles/User.css";

const style = {
  background: "#87a878",
  color: "white",
};

class PasswordUpdate extends Component {
  state = {
    old_password: "",
    new_password: "",
    confirmed_password: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.new_password === this.state.confirmed_password) {
      const { new_password, old_password } = this.state;
      apiHandler
        .updateUserPassword({ new_password, old_password })
        .then((data) => {
          console.dir(data);
          console.log("password changed");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  checkError = () => {
    for (const key in this.state.user) {
      if (this.state[key] === "") {
        return true;
      }
    }
    return false;
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  render() {
    console.log("rendering");
    return (
      <form onSubmit={this.handleSubmit} className="User__container">
        <h2>Modifier mon mot de passe</h2>

        <div>
          <label htmlFor="old_password">Ancien mot de passe</label>
          <input
            onChange={this.handleChange}
            type="password"
            id="old_password"
            name="old_password"
            value={this.state.old_password}
          />
        </div>

        <div>
          <label htmlFor="new_password">Nouveau mot de passe</label>
          <input
            onChange={this.handleChange}
            type="password"
            id="new_password"
            name="new_password"
            value={this.state.new_password}
          />
        </div>

        <div>
          <label htmlFor="confirmed_password">
            Confirmer nouveau mot de passe
          </label>
          <input
            onChange={this.handleChange}
            type="password"
            id="confirmed_password"
            name="confirmed_password"
            value={this.state.confirmed_password}
          />
        </div>

        <div>
          <Button
            style={style}
            onClick={this.handleSubmit}
            variant="contained"
            disabled={this.checkError()}
          >
            Enregistrer
          </Button>
        </div>
      </form>
    );
  }
}

export default PasswordUpdate;
