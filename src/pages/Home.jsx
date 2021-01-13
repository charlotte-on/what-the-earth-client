import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Button variant="primary">Chercher un produit</Button>
        <Link to="/producers">
          <Button variant="primary">Chercher un producteur</Button>
        </Link>
        <p>
          Bienvenue sur What the Earth, base de données interactive super
          géniale. Wanna know more about our project,{" "}
          <Link className="link-underlined" to="/">
            click here
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
