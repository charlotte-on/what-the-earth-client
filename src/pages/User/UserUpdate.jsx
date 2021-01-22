import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../../components/Auth/withUser";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import { Redirect } from "react-router-dom";
// import "../../styles/User.css";
import TextField from "@material-ui/core/TextField";

const style = {
  background: "#87a878",
  color: "white",
  margin: "10px",
};

class UserUpdate extends Component {
  state = {
    user: null,
    httpResponse: null,
    isLoading: true,
  };

  imageRef = React.createRef();

  componentDidMount() {
    apiHandler
      .getUserInfos(this.props.context.user._id)
      .then((data) => {
        this.setState({ user: data, isLoading: false });
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
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ user: { ...this.state.user, [key]: value } });
  };

  checkError = () => {
    for (const key in this.state.user) {
      if (this.state[key] === "") {
        return true;
      }
    }
    return false;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();

    for (const key in this.state.user) {
      if (key === "image") continue;
      fd.append(key, this.state.user[key]);
    }

    if (this.imageRef.current.files[0]) {
      fd.append("image", this.imageRef.current.files[0]);
    }

    apiHandler
      .updateUser(fd)
      .then((data) => {
        this.props.context.setUser(data, () => {
          this.props.history.push("/profile");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // to add a preview of the uploaded image before saving
  handleFileSelect = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    this.setState({ url: url });
  };

  render() {
    if (!this.state.user) {
      return (
        <div>
          <img
            src="/media/loading.gif"
            alt="loading icon"
            className="loading"
          />
        </div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div style={{position: "absolute", padding: "15px",}}>
          <Link to={"/profile"}>
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
            Accueil / Mon profil / Modifier mon profil
          </p>
        </div>

        <div className="center-column" style={{paddingTop: "20%"}}>
          <h3>Modifier mon profil</h3>

          <img src={this.state.url} alt="" />
          <div>
            <input
              onChange={this.handleFileSelect}
              type="file"
              ref={this.imageRef}
              id="icon-button-file"
              style={{ display: "none" }}
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
            value={this.state.user.firstName}
            label="Prénom"
            type="text"
            id="firstName"
            name="firstName"
            variant="outlined"
            style={{ margin: "10px" }}
            onChange={this.handleChange}
          />

          <TextField
            value={this.state.user.lastName}
            label="Nom"
            type="text"
            id="lastName"
            name="lastName"
            variant="outlined"
            style={{ margin: "10px" }}
            onChange={this.handleChange}
          />

          <TextField
            value={this.state.user.email}
            label="Email"
            type="email"
            id="email"
            name="email"
            variant="outlined"
            style={{ margin: "10px" }}
            onChange={this.handleChange}
          />

          <Button
            style={style}
            onClick={this.handleSubmit}
            variant="contained"
            disabled={this.checkError()}
          >
            Modifier mon profil
          </Button>

          <Link to={`/profile/${this.props.context.user._id}/password`}>
            <Button
              style={style}
              variant="contained"
              disabled={this.checkError()}
            >
              Modifier mon mot de passe
            </Button>
          </Link>
        </div>
      </form>
    );
  }
}

export default withUser(UserUpdate);
