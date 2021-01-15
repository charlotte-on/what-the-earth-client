import React from "react";
import { withUser } from "../../components/Auth/withUser";
import apiHandler from "../../api/apiHandler";

class UserPage extends React.Component {
  handleChange = (event) => {
    event.preventDefault();
  };

  handleLogout = () => {
    apiHandler
      .logout()
      .then(() => {
        this.props.context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (!this.props.context.user) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Compte 🌿</h2>
        <br />
        <div>
          <h3>{this.props.context.user.firstName}</h3>
        </div>

        <div>
          <h3>{this.props.context.user.lastName}</h3>
        </div>

        <div>
          <h3>{this.props.context.user.email}</h3>
        </div>

        <div>
          <button to="/profile/${userId}" onClick={this.handleChange}>
            Updater mon profil
          </button>
        </div>

        <div onClick={this.handleLogout}>
          <button>Se déconnecter</button>
        </div>
      </div>
    );
  }
}

export default withUser(UserPage);

// how to add the userId in the route?
