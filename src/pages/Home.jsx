import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import Footer from "../components/Footer";
import MapIcon from "@material-ui/icons/Map";
import ListIcon from "@material-ui/icons/List";

const style = {
  background: "#87a878",
  color: "white",
  margin: "10px",
};

class Home extends React.Component {
  state = {
    background: "/media/grass-cover.jpg",
  };
  componentDidMount() {
    document.title = "What the Earth • Accueil";
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
      <div>
        <div
          style={{
            width: "auto",
            height: "100vh",
            backgroundImage: "url(/media/wheat5.jpeg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        ></div>

        <div
          style={{
            padding: "10px",
            color: "white",
            textAlign: "center",
            position: "absolute",
            top: "calc(50% - 200px)",
            left: "calc(50% - 175px)",
            width: "350px",
            textShadow: "1px 1px 1px black",
          }}
        >
          <p>
            Bienvenue sur What the Earth, base de données intelligente qui vous
            permet de mieux comprendre l'impact de ce que vous mettez dans votre
            assiette. Pour en savoir plus sur notre projet,{" "}
            <Link className="link-underlined" to="/about">
              cliquez ici
            </Link>
            .
          </p>

          <Link to="/products">
            <Button startIcon={<ListIcon />} style={style} variant="contained">
              Liste des produits
            </Button>
          </Link>

          <Link to="/producers">
            <Button startIcon={<MapIcon />} style={style} variant="contained">
              Mes producteurs locaux
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
        </div>
        <Footer />
      </div>
    );
  }
}

export default withUser(Home);
