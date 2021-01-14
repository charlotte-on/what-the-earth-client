import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class Home extends React.Component {
  componentDidMount() {
    document.title = "What the Earth — Accueil";
  }

  render() {
    return (
      <div className="center-column">
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
        <p style={{ padding: "10px", textAlign: "center" }}>
          Bienvenue sur What the Earth, base de données interactive super
          géniale. Pour en savoir plus sur notre projet,{" "}
          <Link className="link-underlined" to="/">
            cliquez ici
          </Link>
          .
        </p>
        <Link className="link-underlined" to="/signup">
          Créer un compte
        </Link>
        <Link className="link-underlined" to="/signin">
          Me connecter
        </Link>
        <p>© 2021 What the Earth</p>
      </div>
    );
  }
}

export default Home;
