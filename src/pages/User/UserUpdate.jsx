import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../../components/Auth/withUser";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

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

  // to add a preview of the uploaded image
  handleFileSelect = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    this.setState({ url: url });
  };

  render() {
    // should I use const {this.state.isLoading} = this.state?
    // if (this.state.isLoading) return <div>Loading...</div>;

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
        <h3>Updater mon profil</h3>
        <img src={this.state.url} alt="" />
        <div>
          <input
            onChange={this.handleFileSelect}
            type="file"
            ref={this.imageRef}
          />
        </div>

        <div>
          <div>
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={this.state.user.firstName}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              name="lastName"
              value={this.state.user.lastName}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={this.state.user.email}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <Button variant="contained" disabled={this.checkError()}>
          Mettre à jour mon profil
        </Button>
        <Button variant="contained" disabled={this.checkError()}>
          Mettre à jour mon mot de passe
        </Button>
      </form>
    );
  }
}

export default withUser(UserUpdate);
