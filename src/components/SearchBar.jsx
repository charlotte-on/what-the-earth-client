import React, { Component } from "react";

export class SearchBar extends Component {
  render() {
    return (
      <form className="form">
        <input
          className="search"
          name="search"
          type="search"
          placeholder="Crème de marrons"
          onChange={this.props.handleSearch}
        />
      </form>
    );
  }
}

export default SearchBar;
