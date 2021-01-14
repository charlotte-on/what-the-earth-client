import React from "react";
import axios from "axios";
import { withUser } from "../../components/Auth/withUser";
import apiHandler from "../../api/apiHandler";

class UserPage extends React.Component {
  render() {
    if (!this.props.context.user) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Compte 🌿</h2>

        <div>
          <h3>{this.props.context.user.firstName}</h3>
        </div>

        <div>
          <h3>{this.props.context.user.lastName}</h3>
        </div>

        <div>
          <h3>{this.props.context.user.email}</h3>
        </div>

        <button>Updater mon profil</button>

        <button>Se déconnecter</button>
      </div>
    );
  }
}

export default withUser(UserPage);
