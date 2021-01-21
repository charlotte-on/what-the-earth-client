import React, { Component } from "react";
import axios from "axios";

export class ProductPage extends Component {
  state = {
    product: null,
  };

  componentDidMount() {
    axios
      .get(
        `https://koumoul.com/s/data-fair/api/v1/datasets/agribalyse-synthese/lines?page=1&format=json&q_mode=simple&qs=${this.props.match.params.id}&size=20&select=Code_AGB,Code_CIQUAL,Groupe_d%27aliment,Sous-groupe_d%27aliment,Nom_du_Produit_en_Fran%C3%A7ais,LCI_Name,Livraison,Mat%C3%A9riau_d%27emballage,Pr%C3%A9paration,DQR_-_Note_de_qualit%C3%A9_de_la_donn%C3%A9e_%281_excellente___5_tr%C3%A8s_faible%29,Score_unique_EF_%28mPt%2Fkg_de_produit%29,Changement_climatique_%28kg_CO2_eq%2Fkg_de_produit%29,Appauvrissement_de_la_couche_d%27ozone_%28E-06_kg_CVC11_eq%2Fkg_de_produit%29,Rayonnements_ionisants_%28kBq_U-235_eq%2Fkg_de_produit%29,Formation_photochimique_d%27ozone_%28E-03_kg_NMVOC_eq%2Fkg_de_produit%29,Particules_%28E-06_disease_inc_%2Fkg_de_produit%29,Acidification_terrestre_et_eaux_douces_%28mol_H%2B_eq%2Fkg_de_produit%29,Eutrophisation_terreste_%28mol_N_eq%2Fkg_de_produit%29,Eutrophisation_eaux_douces_%28E-03_kg_P_eq%2Fkg_de_produit%29,Eutrophisation_marine_%28E-03_kg_N_eq%2Fkg_de_produit%29,Utilisation_du_sol_%28Pt%2Fkg_de_produit%29,%C3%89cotoxicit%C3%A9_pour_%C3%A9cosyst%C3%A8mes_aquatiques_d%27eau_douce_%28CTUe%2Fkg_de_produit%29,%C3%89puisement_des_ressources_eau_%28m3_depriv_%2Fkg_de_produit%29,%C3%89puisement_des_ressources_%C3%A9nerg%C3%A9tiques_%28MJ%2Fkg_de_produit%29,%C3%89puisement_des_ressources_min%C3%A9raux_%28E-06_kg_Sb_eq%2Fkg_de_produit%29,Saisonnalit%C3%A9,Transport_par_avion_%281___par_avion%29,_id,_i,_rand&highlight=_id&sampling=neighbors`
      )
      .then((responseFromApi) => {
        this.setState({
          product: responseFromApi.data.results[0],
        });
      });
  }

  roundNumber = (number) => {
    return <span style={{ fontWeight: "bold" }}>{number.toFixed([2])}</span>;
  };

  coloredNumber = (number) => {
    if (number < 0.5) return "green";
    else if (number >= 0.5 && number < 1.5) return "orange";
    else return "red";
  };

  render() {
    if (!this.state.product) {
      return (
        <img src="/media/loading.gif" alt="loading icon" className="loading" />
      );
    }

    return (
      <div>
        <h1>{this.state.product.Nom_du_Produit_en_Français}</h1>
        <div className="subtitle">
          <h5>Catégorie: {this.state.product["Sous-groupe_d'aliment"]}</h5>
          <h3>
            {" "}
            Score EPF:{" "}
            <span
              style={{
                color: this.coloredNumber(
                  this.state.product["Score_unique_EF_(mPt/kg_de_produit)"]
                ),
                fontWeight: "bold",
              }}
            >
              {this.roundNumber(
                this.state.product["Score_unique_EF_(mPt/kg_de_produit)"]
              )}
            </span>
          </h3>
        </div>

        <div></div>
        <table>
          <thead>
            <tr>
              <th>Indicateur</th>
              <th>Mesure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Score unique EF</td>
              <td>
                {this.roundNumber(
                  this.state.product["Score_unique_EF_(mPt/kg_de_produit)"]
                )}{" "}
                mPt/kg de produit
              </td>
            </tr>
            <tr>
              <td>Changement climatique</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Changement_climatique_(kg_CO2_eq/kg_de_produit)"
                  ]
                )}{" "}
                kg CO2 eq/kg de produit
              </td>
            </tr>
            <tr>
              <td>Appauvrissement de la couche d'ozone</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Appauvrissement_de_la_couche_d'ozone_(E-06_kg_CVC11_eq/kg_de_produit)"
                  ]
                )}{" "}
                E-06 kg CVC11 eq/kg de produit
              </td>
            </tr>
            <tr>
              <td>Rayonnements ionisants</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Rayonnements_ionisants_(kBq_U-235_eq/kg_de_produit)"
                  ]
                )}{" "}
                kBq U-235 eq/kg de produit
              </td>
            </tr>
            <tr>
              <td>Formation photochimique d'ozone</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Formation_photochimique_d'ozone_(E-03_kg_NMVOC_eq/kg_de_produit)"
                  ]
                )}{" "}
                E-03 kg NMVOC eq/kg de produit
              </td>
            </tr>
            <tr>
              <td>Particules</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Particules_(E-06_disease_inc_/kg_de_produit)"
                  ]
                )}{" "}
                E-06 disease inc./kg de produit
              </td>
            </tr>
            <tr>
              <td>Acidification terrestre et eaux douces</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Acidification_terrestre_et_eaux_douces_(mol_H+_eq/kg_de_produit)"
                  ]
                )}{" "}
                mol H+ eq/kg de produit
              </td>
            </tr>
            <tr>
              <td>Eutrophisation terreste</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Eutrophisation_terreste_(mol_N_eq/kg_de_produit)"
                  ]
                )}{" "}
                mol N eq/kg de produit
              </td>
            </tr>
            <tr>
              <td>Eutrophisation eaux douces</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Eutrophisation_eaux_douces_(E-03_kg_P_eq/kg_de_produit)"
                  ]
                )}{" "}
                E-03 kg P eq/kg de produit
              </td>
            </tr>
            <tr>
              <td>Eutrophisation marine</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Eutrophisation_marine_(E-03_kg_N_eq/kg_de_produit)"
                  ]
                )}{" "}
                E-03 kg N eq/kg de produit
              </td>
            </tr>
            <tr>
              <td>Utilisation du sol</td>
              <td>
                {this.roundNumber(
                  this.state.product["Utilisation_du_sol_(Pt/kg_de_produit)"]
                )}{" "}
                Pt/kg de produit
              </td>
            </tr>
            <tr>
              <td>Écotoxicité pour écosystèmes aquatiques d'eau douce</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Écotoxicité_pour_écosystèmes_aquatiques_d'eau_douce_(CTUe/kg_de_produit)"
                  ]
                )}{" "}
                CTUe/kg de produit
              </td>
            </tr>
            <tr>
              <td>Épuisement des ressources eau</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Épuisement_des_ressources_eau_(m3_depriv_/kg_de_produit)"
                  ]
                )}{" "}
                m3 depriv./kg de produit
              </td>
            </tr>
            <tr>
              <td>Épuisement des ressources énergétiques</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Épuisement_des_ressources_énergétiques_(MJ/kg_de_produit)"
                  ]
                )}{" "}
                MJ/kg de produit
              </td>
            </tr>
            <tr>
              <td>Épuisement des ressources minéraux</td>
              <td>
                {this.roundNumber(
                  this.state.product[
                    "Épuisement_des_ressources_minéraux_(E-06_kg_Sb_eq/kg_de_produit)"
                  ]
                )}{" "}
                E-06 kg Sb eq/kg de produit
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductPage;
