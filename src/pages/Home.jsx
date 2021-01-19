import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

class Home extends React.Component {
  componentDidMount() {
    document.title = "What the Earth — Accueil";
  }

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
    return (
      <div className="center-column">
        <div style={{ position: "relative" }}>
          <img
            style={{ filter: "brightness(60%)" }}
            src="/media/grass-cover.jpg"
            alt="What the Earth"
          />
          <p
            style={{
              padding: "10px",
              color: "white",
              textAlign: "center",
              position: "absolute",
              top: "calc(50% - 46px)",
              left: "calc(50% - 175px)",
              width: "350px",
            }}
          >
            Bienvenue sur What the Earth, base de données interactive super
            géniale. Pour en savoir plus sur notre projet,{" "}
            <Link className="link-underlined" to="/">
              cliquez ici
            </Link>
            .
          </p>
        </div>

        <Link to="/products">
          <Button style={{ margin: "10px" }} variant="contained">
            Liste des produits
          </Button>
        </Link>
        <Link to="/producers">
          <Button style={{ margin: "10px" }} variant="contained">
            Chercher un producteur
          </Button>
        </Link>
        {!this.props.context.user && (
          <div className="center-column">
            <h5>Je suis un particulier</h5>
            <Link className="link-underlined" to="/signup">
              Créer un compte
            </Link>
            <Link className="link-underlined" to="/signin">
              Me connecter
            </Link>
            <h5>Je suis un professionnel</h5>
            <Link className="link-underlined" to="/producers/register">
              Enregistrer mon commerce
            </Link>
            <Link className="link-underlined" to="/producers/signin">
              J'accède à mon espace
            </Link>
          </div>
        )}

        {this.props.context.user && !this.props.context.producer ? (
          <div className="center-column">
            <Link className="link-underlined" to="/profile">
              Mon compte
            </Link>
            <p onClick={this.handleLogout} className="link-underlined">
              Se déconnecter
            </p>
          </div>
        ) : null}

        {this.props.context.producer && (
          <div className="center-column">
            <p>{this.props.context.user.companyName}</p>
            <Link className="link-underlined" to="/profile">
              Mon compte pro
            </Link>
            <Link
              className="link-underlined"
              to={`/producers/edit/${this.props.context.user._id}`}
            >
              Editer ma page entreprise
            </Link>
            <p onClick={this.handleLogout} className="link-underlined">
              Se déconnecter
            </p>
          </div>
        )}

        <p>© 2021 What the Earth</p>
      </div>
    );
  }
}

export default withUser(Home);
