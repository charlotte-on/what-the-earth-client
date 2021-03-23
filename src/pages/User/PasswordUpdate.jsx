import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

const style = {
  background: "#87a878",
  color: "white",
  margin: "10px",
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
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={{ position: "absolute", padding: "15px" }}>
          <Link to={"/profile/:id"}>
            <h4
              style={{
                textAlign: "left",
                fontSize: "13px",
              }}
            >
              Retour
            </h4>
          </Link>

          <p
            style={{
              textAlign: "left",
              fontSize: "11px",
            }}
          >
            Accueil / Mon profil / Modifier mon profil / Modifier mon mot de
            passe
          </p>
        </div>

        <div className="center-column" style={{ paddingTop: "20%" }}>
          <input
            id="userName"
            name="username"
            autoComplete="username"
            style={{ display: "none" }}
          />

          <h2>Modifier mon mot de passe</h2>

          <TextField
            value={this.state.old_password}
            label="Ancien mot de passe"
            type="password"
            id="old_password"
            name="old_password"
            autoComplete="current-password"
            variant="outlined"
            style={{ margin: "10px" }}
            onChange={this.handleChange}
          />

          <TextField
            value={this.state.new_password}
            label="Nouveau mot de passe"
            type="password"
            id="new_password"
            name="new_password"
            autoComplete="new-password"
            variant="outlined"
            style={{ margin: "10px" }}
            onChange={this.handleChange}
          />

          <TextField
            value={this.state.confirmed_password}
            label="Confirmer"
            type="password"
            id="confirmed_password"
            name="confirmed_password"
            autoComplete="new-password"
            variant="outlined"
            style={{ margin: "10px" }}
            onChange={this.handleChange}
          />

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
        </div>
      </form>
    );
  }
}

export default PasswordUpdate;
