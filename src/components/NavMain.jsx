import React from "react";
import { Link, NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

import "../styles/NavMain.css";

export class NavMain extends React.Component {
  state = {
    user: null,
    active: true,
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

  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  render() {
    return (
      <nav className="NavMain">
        <img
          className="burger-icon"
          src="/media/burger-icon.png"
          alt="burger menu"
          onClick={this.toggleClass}
        />
        <div className={this.state.active ? "hidden" : null}>
          <div className="lateral-menu">
            <div className="cross" onClick={this.toggleClass}>
              <img src="/media/cross.png" alt="" />
            </div>
            <div>
              {!this.props.context.user ? (
                <h4>Bonjour</h4>
              ) : (
                <div className="hello">
                  {" "}
                  <img
                    src={this.props.context.user.image}
                    alt="profile picture"
                  />{" "}
                  <h4>Bonjour {this.props.context.user.firstName}</h4>
                </div>
              )}
            </div>

            <nav>
              <Link to="/" className="lateral-link" onClick={this.toggleClass}>
                Accueil
              </Link>
              <hr />
              <Link
                to="/products"
                className="lateral-link"
                onClick={this.toggleClass}
              >
                Produits
              </Link>
              <hr />
              <Link
                to="/products/simulator"
                className="lateral-link"
                onClick={this.toggleClass}
              >
                Simulateur
              </Link>
              <hr />
              <Link
                to="/producers"
                className="lateral-link"
                onClick={this.toggleClass}
              >
                Producteurs
              </Link>
              <hr />
              <Link
                to="/profile"
                className="lateral-link"
                onClick={this.toggleClass}
              >
                Mon profil
              </Link>
              <hr />
              <Link
                to="/about"
                className="lateral-link"
                onClick={this.toggleClass}
              >
                À propos
              </Link>
            </nav>
            <div className="logout">
              {!this.props.context.user ? (
                <Link to="/signin" onClick={this.toggleClass}>
                  Me connecter
                </Link>
              ) : (
                <div
                  onClick={() => {
                    this.handleLogout();
                    this.toggleClass();
                  }}
                >
                  <img src="/media/logout.png" alt="logout icon" />{" "}
                  <p>Se déconnecter</p>
                </div>
              )}
            </div>
          </div>
          <div className="opacity"></div>
        </div>
        <NavLink to="/">
          <h3 className="logo">What the Earth</h3>
        </NavLink>
      </nav>
    );
  }
}

export default withUser(NavMain);
