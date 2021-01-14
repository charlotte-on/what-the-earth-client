import React from "react";
import axios from "axios";

class UserPage extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
  };

  componentDidMount() {
    // console.log(this.props.match.params.id);
    const userId = this.props.match.params.id;

    axios.get("http://localhost:4000/users/" + userId).then((apiResponse) => {
      //   console.log(apiResponse);
      this.setState({
        user: apiResponse.data,
      });
    });
  }

  render() {
    if (!this.state.user) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Compte 🌿</h2>

        <div>
          <h3>{this.state.user.firstName}</h3>
        </div>

        <div>
          <h3>{this.state.user.lastName}</h3>
        </div>

        <div>
          <h3>{this.state.user.email}</h3>
        </div>

        <button>Updater mon profil</button>

        <button>Se déconnecter</button>
      </div>
    );
  }
}

export default UserPage;
