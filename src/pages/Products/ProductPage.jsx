import React, { Component } from "react";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Tooltip } from "@material-ui/core";
import axios from "axios";

const EPF = `Sans unité, plus le score est bas plus son impact sur l'environnement est faible. Ce score unique est une moyenne pondérée des 16 indicateurs (voir tableau ci-dessous), calculé selon la méthodologie européenne « PEF » (Product Environmental Footprint).`;
const climateChange = `Indicateur le plus connu, correspond à la modification du climat, affectant l'écosystème global.`;
const particules = `
Les particules fines pénètrent dans les organismes, notamment via les poumons. Elles ont un effet sur la santé humaine.`;
const waterResources = `Correspond à la consommation d'eau et son épuisement dans certaines régions. Cette catégorie tient compte de la rareté (cela a plus d’impact de consommer un litre d'eau au Maroc qu'en Bretagne).`;
const energyResources = `Correspond à l'épuisement des ressources énergétiques non renouvelables : charbon, gaz, pétrole, uranium, etc.`;
const landUse = `Les terres sont une ressource finie, qui se partage entre milieux "naturels" (foret), productifs (agricultures) et urbains. L'usage des terres et les habitats déterminent dans une large mesure la biodiversité. Cette catégorie reflète donc l'impact d'une activité sur la dégradation des terres, en référence à « l'état naturel ».`;
const mineralResoures = `Correspond à l'épuisement des ressources minérales non renouvelables : cuivre, potasse, terres rares, sable, etc.`;
const ozone = `La couche d'ozone est située en haute altitude dans l'atmosphère, elle protège des rayons ultra-violets solaires. Son appauvrissement augmente l’exposition de l'ensemble des êtres vivants à ces radiations négatives (cancérigènes en particulier).`;
const acidification = `Résulte d'émissions chimiques dans l'atmosphère qui se redéposent dans les écosystèmes. Cette problématique est connue en particulier via le phénomène des pluies acides.`;
const radiation = `Correspond aux effets de la radioactivité. Cet impact correspond aux déchets radioactifs résultants de la production de l'électricité nucléaire.`;
const ionisant = `Correspond aux effets de la radioactivité. Cet impact correspond aux déchets radioactifs résultants de la production de l'électricité nucléaire.`;
const photochemical = `Correspond à une dégradation de la qualité de l'air, principalement via la formation de brouillard de basse altitude nommé "smog". Il a des conséquences néfastes sur la santé.`;
const eutrophisationTerr = `Comme dans l'eau, l'eutrophisation terrestre correspond à un enrichissement excessif du milieu, en azote en particulier, conduisant a un déséquilibre et un appauvrissement de l'écosystème. Ceci concerne principalement les sols agricoles.`;
const eutrophisationMar = `Correspond à un enrichissement excessif des milieux naturels en nutriments, ce qui conduit à une prolifération et une asphyxie (zone morte). C'est ce phénomène qui est à l'origine des algues vertes.`;
const eutrophisationEau = `Correspond à un enrichissement excessif des milieux naturels en nutriments, ce qui conduit à une prolifération et une asphyxie (zone morte). C'est ce phénomène qui est à l'origine des algues vertes. On peut le retrouver en rivière et en lac également.`;
const ecotoxicity = `Indicateurs de toxicité via la contamination de l'environnement. Ces indicateurs sont encore peu robustes actuellement.`;

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
        <div style={{position: "absolute", padding: "15px",}}>
          <Link to={"/products"}>
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
            Accueil / Produits / Produit
          </p>
        </div>
        <h2
          style={{
            padding: "20%",
            textAlign: "center",
          }}
        >
          {this.state.product.Nom_du_Produit_en_Français}
        </h2>
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
            <Tooltip title={EPF} enterTouchDelay={100} leaveDelay={17000}>
              <InfoOutlinedIcon fontSize={"small"} />
            </Tooltip>
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
                <Tooltip title={EPF} enterTouchDelay={100} leaveDelay={17000}>
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={climateChange}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip title={ozone} enterTouchDelay={100} leaveDelay={17000}>
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={ionisant}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={photochemical}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={particules}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={acidification}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={eutrophisationTerr}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={eutrophisationEau}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={eutrophisationMar}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
              </td>
            </tr>
            <tr>
              <td>Utilisation du sol</td>
              <td>
                {this.roundNumber(
                  this.state.product["Utilisation_du_sol_(Pt/kg_de_produit)"]
                )}{" "}
                Pt/kg de produit
                <Tooltip
                  title={landUse}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={ecotoxicity}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={waterResources}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={energyResources}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
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
                <Tooltip
                  title={mineralResoures}
                  enterTouchDelay={100}
                  leaveDelay={17000}
                >
                  <InfoOutlinedIcon fontSize={"small"} />
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductPage;
