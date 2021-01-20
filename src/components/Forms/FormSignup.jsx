import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const style = {
  background: "#87a878",
  color: "white",
};

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    image: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  imageRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();

    for (const key in this.state) {
      if (key === "image") continue;
      fd.append(key, this.state[key]);
    }

    if (this.imageRef.current.files[0]) {
      console.log(this.imageRef.current.files[0]);
      fd.append("image", this.imageRef.current.files[0]);
    }

    apiHandler
      .signup(fd)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //to add a preview of the uploaded image before saving
  handleFileSelect = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    this.setState({ url: url });
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
        <img src={this.state.url} alt="" />
        <div>
          <input
            onChange={this.handleFileSelect}
            type="file"
            ref={this.imageRef}
            id="icon-button-file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              style={style}
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera fontSize="large" />
            </IconButton>
          </label>
        </div>

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
        <Button style={style} type="submit" variant="contained">
          S'inscrire
        </Button>
      </form>
    );
  }
}

export default withRouter(FormSignup);
