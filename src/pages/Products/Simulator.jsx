import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import Agribalyse from "../../data/Agribalyse.json";

import "../../styles/Simulator.css";

export class Simulator extends Component {
  state = {
    productsList: {},
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const value = Autocomplete.value;
    console.log(value);
  };

  onProductChange = (event, values) => {
    this.setState(
      {
        productsList: values,
      },
      () => {
        console.log(this.state.products);
      }
    );
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
            style={{ width: 300 }}
            onChange={this.onProductsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product"
                variant="outlined"
                name="TextField"
              />
            )}
          />
          <button className="add">
            <img src="/media/add.png" alt="add button" />
            <p>Ajouter un produit</p>
          </button>
        </form>
      </div>
    );
  }
}

export default Simulator;
