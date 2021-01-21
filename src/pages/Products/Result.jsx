import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";

export class Result extends Component {
  state = {
    recipe: null,
  };

  componentDidMount = () => {
    apiHandler
      .getResult(this.props.match.params.id)
      .then((recipe) => {
        this.setState({ recipe });
      })
      .catch((err) => console.log(err));
  };

  getDividedResult = () => {
    function divide(array) {
      return array.reduce(function (acc, product) {
        let result =
          (product.qty / 1000) *
          product.impact_environnemental["Score unique EF"].synthese;
        return result + acc;
      }, 0);
    }

    const converted = this.convertArray(this.state.recipe.products);

    return divide(converted);
  };

  convertArray = (array) => {
    const convertedArray = Object.keys(array[0]).map((key) => {
      return array[0][key];
    });
    return convertedArray;
  };

  roundNumber = (number) => {
    return number.toFixed([2]);
  };

  coloredNumber = (number) => {
    if (number < 0.5) return "green";
    else if (number >= 0.5 && number < 1.5) return "orange";
    else return "red";
  };

  render() {
    if (!this.state.recipe) {
      return (
        <img src="/media/loading.gif" alt="loading icon" className="loading" />
      );
    }

    return (
      <div>
        <div>
          <Link to={"/products/simulator"}>
            <h4
              style={{
                textAlign: "left",
                top: "calc(2% - 200px)",
                fontSize: "13px",
              }}
            >
              Retour
            </h4>
          </Link>

          <p
            style={{
              textAlign: "left",
              top: "calc(2% - 180px)",
              fontSize: "11px",
            }}
          >
            Accueil / Produits / Simulateur / Résultat
          </p>
        </div>
        <h2
          style={{
            padding: "10px",
            textAlign: "center",
          }}
        >
          Résultat de la simulation
        </h2>
        <h2>Ingrédients:</h2>

        <ul>
          {this.convertArray(this.state.recipe.products).map((prod) => {
            return (
              <li>
                {prod.nom_francais}:{" "}
                {this.roundNumber(
                  (prod.qty / 1000) *
                    prod.impact_environnemental["Score unique EF"].synthese
                )}
              </li>
            );
          })}
        </ul>
        <h3>
          Score EPF:{" "}
          <span style={{ color: this.coloredNumber(this.getDividedResult()) }}>
            {this.roundNumber(this.getDividedResult())}
          </span>
        </h3>

        {/* <table>
          <thead>
            <tr>
              <th>Indicateur</th>
              <th>Mesure</th>
              <th>Unité</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Score unique EF</td>
              <td>Result</td>
              <td>mPt/kg de produit</td>
            </tr>
            <tr>
              <td>Changement climatique</td>
              <td>Result</td>
              <td>kg CO2 eq/kg de produit</td>
            </tr>
            <tr>
              <td>Appauvrissement de la couche d'ozone</td>
              <td>Result</td>
              <td>E-06 kg CVC11 eq/kg de produit</td>
            </tr>
            <tr>
              <td>Rayonnements ionisants</td>
              <td>Result</td>
              <td>kBq U-235 eq/kg de produit</td>
            </tr>
            <tr>
              <td>Formation photochimique d'ozone</td>
              <td>Result</td>
              <td>E-03 kg NMVOC eq/kg de produit</td>
            </tr>
            <tr>
              <td>Particules</td>
              <td>Result</td>
              <td>E-06 disease inc./kg de produit</td>
            </tr>
            <tr>
              <td>Acidification terrestre et eaux douces</td>
              <td>Result</td>
              <td>mol H+ eq/kg de produit</td>
            </tr>
            <tr>
              <td>Eutrophisation terreste</td>
              <td>Result</td>
              <td>mol N eq/kg de produit</td>
            </tr>
            <tr>
              <td>Eutrophisation eaux douces</td>
              <td>Result</td>
              <td>E-03 kg P eq/kg de produit</td>
            </tr>
            <tr>
              <td>Eutrophisation marine</td>
              <td>Result</td>
              <td>E-03 kg N eq/kg de produit</td>
            </tr>
            <tr>
              <td>Utilisation du sol</td>
              <td>Result</td>
              <td>Pt/kg de produit</td>
            </tr>
            <tr>
              <td>Écotoxicité pour écosystèmes aquatiques d'eau douce</td>
              <td>Result</td>
              <td>CTUe/kg de produit</td>
            </tr>
            <tr>
              <td>Épuisement des ressources eau</td>
              <td>Result</td>
              <td>m3 depriv./kg de produit</td>
            </tr>
            <tr>
              <td>Épuisement des ressources énergétiques</td>
              <td>Result</td>
              <td>MJ/kg de produit</td>
            </tr>
            <tr>
              <td>Épuisement des ressources minéraux</td>
              <td>Result</td>
              <td>E-06 kg Sb eq/kg de produit</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    );
  }
}

export default Result;
