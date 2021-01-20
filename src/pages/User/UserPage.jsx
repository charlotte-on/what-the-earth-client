import React from "react";
import { withUser } from "../../components/Auth/withUser";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../../styles/User.css";

const style = {
  background: "#87a878",
  color: "white",
};

class UserPage extends React.Component {
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
      <div>
        <h2>Compte</h2>
        <br />

        <div>
          <img src={this.props.context.user.image} alt="pp" />
        </div>

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
          <Link to={`/profile/${this.props.context.user._id}`}>
            <Button style={style} variant="contained">
              Modifier mon profil
            </Button>
          </Link>
        </div>

        <div onClick={this.handleLogout}>
          <Button style={style} variant="contained">
            Se déconnecter
          </Button>
        </div>
      </div>
    );
  }
}

export default withUser(UserPage);
