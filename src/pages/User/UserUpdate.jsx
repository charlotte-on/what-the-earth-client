import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../../components/Auth/withUser";
import { Redirect } from "react-router-dom";

class UserUpdate extends Component {
  state = {
    user: null,
    httpResponse: null,
    isLoading: true,
  };

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
    apiHandler
      .updateUser(this.props.context.user._id, this.state.user)
      .then((data) => {
        this.props.context.setUser(data, () => {
          this.props.history.push("/profile");
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        <h3>Updater mon profil</h3>

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

          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={this.state.user.password}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <button disabled={this.checkError()}>Mettre à jour</button>
      </form>
    );
  }
}

export default withUser(UserUpdate);
