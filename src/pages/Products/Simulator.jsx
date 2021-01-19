import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import Agribalyse from "../../data/Agribalyse.json";

import "../../styles/Simulator.css";

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
    this.setState({
      selectedProducts: [...this.state.selectedProducts, value],
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
        <h1>Simulateur de recettes</h1>
        <p>
          Entrez ici des ingrédients afin de simuler l'impact environnemental de
          votre recette
        </p>
        <form onSubmit={this.handleSubmit}>
          <Autocomplete
            id="product"
            options={Agribalyse}
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
          <button className="calculate">
            <p>Calculer</p>
          </button>
        </form>
        {this.state.selectedProducts.length === 0 ? (
          <div>
            <h4>Ajouter des produits</h4>
          </div>
        ) : (
          <div>
            {this.state.selectedProducts.map((prod) => {
              return (
                <div key={prod._id} className="product-selected">
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
                        prod.impact_environnemental["Score unique EF"].synthese
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
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Simulator;
