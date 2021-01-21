import React, { Component } from "react";
import axios from "axios";

export class Result extends Component {
  state = {
    recipeId: this.props.match.params.id,
    recipe: null,
  };

  componentDidMount() {
    apiHandler.getResult(this.state.recipeId).then((recipe) => {
      console.log(recipe);
      this.setState({ recipe });
    });
  }

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
        <h1>Résultat de la simulation</h1>
        <h3>
          Score EPF: <span>Result</span>
        </h3>
        <div></div>
        <table>
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
        </table>
      </div>
    );
  }
}

export default ProductPage;
