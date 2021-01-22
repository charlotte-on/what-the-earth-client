import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import AgribalyseSorted from "../../data/AgribalyseSorted.json";
import Button from "@material-ui/core/Button";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Tooltip } from "@material-ui/core";
import "../../styles/Simulator.css";

const EPF = `Sans unité, plus le score est bas plus son impact sur l'environnement est faible. Ce score unique est une moyenne pondérée des 16 indicateurs (voir tableau ci-dessous), calculé selon la méthodologie européenne « PEF » (Product Environmental Footprint).`;

const style = {
  background: "#87a878",
  color: "white",
};

const filterOptions = createFilterOptions({
  limit: 50,
});

export class Simulator extends Component {
  state = {
    selectedProducts: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  onProductChange = (value) => {
    if (value === null) return;
    value.qty = Math.trunc(1000 / (this.state.selectedProducts.length + 1));
    this.setState({
      selectedProducts: [
        ...this.state.selectedProducts.map((p) => ({
          ...p,
          qty: Math.trunc(1000 / (this.state.selectedProducts.length + 1)),
        })),
        value,
      ],
    });
  };

  deleteProduct = (name) => {
    this.setState({
      selectedProducts: [
        ...this.state.selectedProducts.filter(
          (product) => product.nom_francais !== name
        ),
      ],
    });
  };

  handleValue = (value, name) => {
    this.setState({
      selectedProducts: this.state.selectedProducts.map((prod) => {
        return prod.nom_francais === name ? { ...prod, qty: value } : prod;
      }),
    });
  };

  calcul = (event) => {
    event.preventDefault();
    const datas = this.state.selectedProducts;

    apiHandler
      .createRecipe(datas)
      .then((data) => {
        this.props.history.push(`/products/simulator/result/${data._id}`);
      })
      .catch((error) => {
        console.log(error);
      });
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
    return (
      <div className="simulator-name">
        <div style={{ position: "absolute", padding: "15px" }}>
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
            Accueil / Simulateur
          </p>
        </div>
        <h2
          style={{
            padding: "20% 20% 0 20%",
            textAlign: "center",
          }}
        >
          Simulateur
        </h2>

        <div className="simulator-page">
          <p style={{ textAlign: "justify" }}>
            Entrez ici des ingrédients afin de calculer le score EPF{" "}
            <Tooltip title={EPF} enterTouchDelay={100} leaveDelay={17000}>
              <InfoOutlinedIcon fontSize={"small"} />
            </Tooltip>{" "}
            total de vos produits
          </p>
          <form onSubmit={this.handleSubmit} className="input center-column">
            <Autocomplete
              id="product"
              options={AgribalyseSorted}
              getOptionLabel={(option) => option.nom_francais}
              filterOptions={filterOptions}
              style={{ width: 300 }}
              onChange={(event, value) => {
                this.onProductChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Produit"
                  variant="outlined"
                  name="TextField"
                />
              )}
            />
          </form>
          {this.state.selectedProducts.length === 0 ? (
            <div>
              <h3 style={{ textAlign: "center" }}>Ajouter des produits</h3>
            </div>
          ) : (
            <div>
              {this.state.selectedProducts.map((prod) => {
                return (
                  <div key={prod.nom_francais}>
                    <div>
                      <p>
                        {prod.nom_francais} :{" "}
                        <span
                          style={{
                            color: this.coloredNumber(
                              prod.impact_environnemental["Score unique EF"]
                                .synthese
                            ),
                            fontWeight: "bold",
                          }}
                        >
                          {this.roundNumber(
                            prod.impact_environnemental["Score unique EF"]
                              .synthese
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="product-selected">
                      <img
                        src="/media/delete.png"
                        alt="delete button"
                        style={{ height: "15px", marginRight: "5px" }}
                        onClick={() => {
                          this.deleteProduct(prod.nom_francais);
                        }}
                      />
                      <form className="input-quantity">
                        <label htmlFor="label">Quantité</label>
                        <input
                          type="number"
                          id={prod.nom_francais}
                          name="product"
                          min="0"
                          max="100"
                          size="50"
                          value={prod.qty}
                          onChange={(event) =>
                            this.handleValue(
                              event.target.value,
                              prod.nom_francais
                            )
                          }
                        />
                        <label htmlFor="label">g</label>
                      </form>
                    </div>
                  </div>
                );
              })}
              <form
                onSubmit={this.calcul}
                className="calc-button center-column"
              >
                <Button
                  style={style}
                  onClick={this.calcul}
                  variant="contained"
                  className="calculate"
                >
                  <p>Calculer</p>
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Simulator;
