import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { UserContext } from "./UserContext";

class UserProvider extends Component {
  state = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
    producer: false,
  };

  componentDidMount() {
    apiHandler
      .isLoggedIn()
      .then((data) => {
        if (data.companyName) {
          this.setState({
            user: data,
            isLoggedIn: true,
            isLoading: false,
            producer: true,
          });
        } else {
          this.setState({
            user: data,
            isLoggedIn: true,
            isLoading: false,
            producer: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          user: null,
          isLoggedIn: false,
          isLoading: false,
          producer: false,
        });
      });
  }

  setUser = (user, cb) => {
    this.setState(
      { user, isLoggedIn: true, producer: user.companyName ? true : false },
      () => {
        cb && cb();
      }
    );
  };

  removeUser = () => {
    this.setState({ user: null, isLoggedIn: false, producer: false });
  };

  render() {
    //  Setup all the values/functions you want to expose to anybody reading
    // from the AuthContext.
    const authValues = {
      user: this.state.user,
      setUser: this.setUser,
      removeUser: this.removeUser,
      isLoggedIn: this.state.isLoggedIn,
      isLoading: this.state.isLoading,
      producer: this.state.producer,
    };

    return (
      <UserContext.Provider value={authValues}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
