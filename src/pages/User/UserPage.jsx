import React from "react";
import { withUser } from "../../components/Auth/withUser";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

const style = {
  background: "#87a878",
  color: "white",
  margin: "10px 10px 10px 0",
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
        <div style={{position: "absolute", padding: "15px",}}>
          <Link to={"/"}>
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
            Accueil / Mon profil
          </p>
        </div>
        <h2
          style={{
            padding: "20%",
            textAlign: "center",
          }}
        >
          Mon profil
        </h2>
        <br />
        <div className="comments center-column">
       
          <Avatar
            src={this.props.context.user.image}
            alt={this.props.context.user.firstName}
            style={{ height: "110px", width: "110px" }}
          />
          <div style={{ display: "inline" }}>
            <p>
              {this.props.context.user.firstName}{" "}
              {this.props.context.user.lastName}
            </p>
            <div>{this.props.context.user.email}</div>
          </div>

          <Link to={`/profile/${this.props.context.user._id}`}>
            <Button style={style} variant="contained">
              Modifier mon profil
            </Button>
          </Link>
          <div onClick={this.handleLogout}>
            <Button style={style} variant="contained">
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(UserPage);
