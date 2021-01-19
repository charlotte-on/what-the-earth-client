import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";

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

  // checkError = () => {
  //   for (const key in this.state.user) {
  //     if (this.state[key] === "") {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  render() {
    console.log("hello");
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Modifier mon mot de passe</h2>

        <div>
          <label htmlFor="password">Ancien mot de passe</label>
          <input
            onChange={this.handleChange}
            type="password"
            id="password"
            name="old_password"
            value={this.state.old_password}
          />
        </div>

        <div>
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            onChange={this.handleChange}
            type="password"
            id="password"
            name="new_password"
            value={this.state.new_password}
          />
        </div>

        <div>
          <label htmlFor="password">Confirmer nouveau mot de passe</label>
          <input
            type="password"
            id="password"
            name="confirmed_password"
            value={this.state.confirmed_password}
            onChange={this.handleChange}
          />
        </div>

        {/* dans le backend voir si l'ancien mot de passe correspond */}
        {/* nouveau et confirmer doivent etre same === */}

        <Button onClick={this.handleSubmit} variant="contained">
          Enregistrer
        </Button>
      </form>
    );
  }
}

export default PasswordUpdate;
