import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import apiHandler from "../../api/apiHandler";
import AgribalyseSorted from "../../data/AgribalyseSorted.json";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../../styles/Simulator.css";

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
    // const foundIndex = this.state.selectedProducts.findIndex(
    //   (product) => product.nom_francais === name
    // );
    // const copy = { ...this.state.selectedProducts[foundIndex] };
    // copy.qty = value;
    // const copyArr = [...this.state.selectedProducts];
    // copyArr[foundIndex] = copy;
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
      <div>
        <h1>Simulateur de recette</h1>
        <p>
          Entrez ici des ingrédients afin de simuler l'impact environnemental de
          votre recette
        </p>
        <form onSubmit={this.handleSubmit}>
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
            <h4>Ajouter des produits</h4>
          </div>
        ) : (
          <div>
            {this.state.selectedProducts.map((prod) => {
              return (
                <div key={prod.nom_francais}>
                  <div className="product-selected">
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
                    <img
                      src="/media/delete.png"
                      alt="delete button"
                      style={{ height: "15px", marginLeft: "5px" }}
                      onClick={() => {
                        this.deleteProduct(prod.nom_francais);
                      }}
                    />
                  </div>
                  <div>
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
            <form onSubmit={this.calcul}>
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
    );
  }
}

export default Simulator;
