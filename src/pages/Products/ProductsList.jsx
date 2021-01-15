import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";

export class ProductsList extends React.Component {
  state = {
    products: this.props.products,
    filteredProducts: this.props.products,
  };

  handleSearch = (event) => {
    const value = event.target.value;
    this.setState({
      search: value,
      filteredProducts: this.state.products.filter((product) =>
        product.Nom_du_Produit_en_Français.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            event.target.value
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
      ),
    });
  };

  render() {
    return (
      <div>
        <SearchBar handleSearch={this.handleSearch} />
        {this.state.filteredProducts.map((product) => {
          return (
            <div key={product._id}>
              <Link to={`/products/${product._id}`}>
                <h3>{product.Nom_du_Produit_en_Français}</h3>
              </Link>
              <p>
                Score PEF :
                <span
                  style={{
                    color: this.props.coloredNumber(
                      product["Score_unique_EF_(mPt/kg_de_produit)"]
                    ),
                    fontWeight: "bold",
                  }}
                >
                  {this.props.roundNumber(
                    product["Score_unique_EF_(mPt/kg_de_produit)"]
                  )}
                </span>
              </p>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductsList;
