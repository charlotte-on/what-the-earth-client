import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import Agribalyse from "../../data/Agribalyse.json";

import "../../styles/Simulator.css";

export class Simulator extends Component {
  state = {
    productsList: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    return (
      <div>
        {this.state.productsList.map((prod) => {
          return (
            <div key={prod._id}>
              <p>{prod.nom_francais}</p>
            </div>
          );
        })}
      </div>
    );
  };

  onProductChange = (value) => {
    this.setState(
      {
        productsList: value,
      },
      () => {
        console.log("on product change = " + this.state.productsList);
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
            onChange={(event, value) => {
              this.onProductChange(value);
            }}
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
