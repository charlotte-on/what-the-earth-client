import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import Redirect from "react";

class FormRegisterCompany extends Component {
  static contextType = UserContext;

  state = {
    companyName: "",
    producerName: "",
    email: "",
    password: "",
    phoneNumber: "",
    schedule: "",
    field: "",
    description: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .registerCompany(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="companyName">Company Name</label>
        <input
          onChange={this.handleChange}
          value={this.state.companyName}
          type="text"
          id="companyName"
          name="companyName"
        />
        <label htmlFor="producerName">Producer Name</label>
        <input
          onChange={this.handleChange}
          value={this.state.producerName}
          type="text"
          id="producerName"
          name="producerName"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={this.handleChange}
          value={this.state.email}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          onChange={this.handleChange}
          value={this.state.phoneNumber}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
        />
        <label htmlFor="schedule">Schedule</label>
        <input
          onChange={this.handleChange}
          value={this.state.schedule}
          type="text"
          id="schedule"
          name="schedule"
        />
        <label htmlFor="field">Field</label>
        <input
          onChange={this.handleChange}
          value={this.state.field}
          type="text"
          id="field"
          name="field"
        />
        <label htmlFor="description">Description</label>
        <input
          onChange={this.handleChange}
          value={this.state.description}
          type="text"
          id="description"
          name="description"
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default withRouter(FormRegisterCompany);
