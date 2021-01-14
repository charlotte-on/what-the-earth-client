import React, { Component } from "react";
import axios from "axios";

export class Products extends Component {
  state = {
    products: null,
  };

  componentDidMount() {
    axios
      .get(
        "https://koumoul.com/s/data-fair/api/v1/datasets/agribalyse-synthese/lines?page=1&format=json&q_mode=simple&sort=Nom_du_Produit_en_Fran%C3%A7ais&size=20&select=Nom_du_Produit_en_Fran%C3%A7ais,LCI_Name,Livraison,Mat%C3%A9riau_d%27emballage,Pr%C3%A9paration,DQR_-_Note_de_qualit%C3%A9_de_la_donn%C3%A9e_%281_excellente___5_tr%C3%A8s_faible%29,Score_unique_EF_%28mPt%2Fkg_de_produit%29,Changement_climatique_%28kg_CO2_eq%2Fkg_de_produit%29,Appauvrissement_de_la_couche_d%27ozone_%28E-06_kg_CVC11_eq%2Fkg_de_produit%29,Rayonnements_ionisants_%28kBq_U-235_eq%2Fkg_de_produit%29,Formation_photochimique_d%27ozone_%28E-03_kg_NMVOC_eq%2Fkg_de_produit%29,Particules_%28E-06_disease_inc_%2Fkg_de_produit%29,Acidification_terrestre_et_eaux_douces_%28mol_H%2B_eq%2Fkg_de_produit%29,Eutrophisation_terreste_%28mol_N_eq%2Fkg_de_produit%29,Eutrophisation_eaux_douces_%28E-03_kg_P_eq%2Fkg_de_produit%29,Eutrophisation_marine_%28E-03_kg_N_eq%2Fkg_de_produit%29,Utilisation_du_sol_%28Pt%2Fkg_de_produit%29,%C3%89cotoxicit%C3%A9_pour_%C3%A9cosyst%C3%A8mes_aquatiques_d%27eau_douce_%28CTUe%2Fkg_de_produit%29,%C3%89puisement_des_ressources_eau_%28m3_depriv_%2Fkg_de_produit%29,%C3%89puisement_des_ressources_%C3%A9nerg%C3%A9tiques_%28MJ%2Fkg_de_produit%29,%C3%89puisement_des_ressources_min%C3%A9raux_%28E-06_kg_Sb_eq%2Fkg_de_produit%29,Saisonnalit%C3%A9,Transport_par_avion_%281___par_avion%29,_id&sampling=max"
      )
      .then((responseFromApi) => {
        setTimeout(() => {
          this.setState({
            products: responseFromApi.data.results,
          });
        }, 1000);
      });
  }

  render() {
    if (!this.state.products) {
      return (
        <div>
          <h1>Tous les produits</h1>
          <img src="/media/loading.gif" alt="loading icon" />
        </div>
      );
    }
    return (
      <div>
        <h1>Tous les produits</h1>
        {this.state.products.map((product) => {
          return (
            <div key={product._id}>
              <h5>{product.Nom_du_Produit_en_Français}</h5>
              <p>{product["Score_unique_EF_(mPt/kg_de_produit)"]}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Products;
