import React, { Component } from "react";

export class SearchBar extends Component {
  render() {
    return (
      <form className="form">
        <input
          className="search"
          name="search"
          type="search"
          placeholder="Rechercher un produit"
          onChange={this.props.handleSearch}
        />
      </form>
    );
  }
}

export default SearchBar;
