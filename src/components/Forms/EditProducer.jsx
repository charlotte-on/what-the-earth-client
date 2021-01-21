import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import LocationAutoComplete from "./LocationAutoComplete";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { buildFormData } from "../../utils";

const style = {
  background: "#87a878",
  color: "white",
};

class FormEditCompany extends Component {
  static contextType = UserContext;

  state = {
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    schedule: "",
    field: "",
    description: "",
    email: "",
    location: {
      coordinates: [],
    },
    formattedAddress: "",
    bannerImg: "",
  };

  imageRef = React.createRef();

  componentDidMount() {
    apiHandler
      .getOneProducer(this.props.match.params.id)
      .then((data) => {
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          companyName: data.companyName,
          phoneNumber: data.phoneNumber,
          schedule: data.schedule,
          field: data.field,
          description: data.description,
          email: data.email,
          location: {
            coordinates: data.location.coordinates,
          },
          formattedAddress: data.formattedAddress,
          bannerImg: data.bannerImg,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          httpResponse: {
            status: "failure",
            message: "Failure, please try again later",
          },
        });
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlePlace = (place) => {
    const location = place.geometry;
    this.setState({ location, formattedAddress: place.place_name });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();
    const { bannerImg, ...rest } = this.state;

    buildFormData(fd, rest);
    // console.log(Object.fromEntries(fd));

    if (this.imageRef.current.files[0]) {
      console.log(this.imageRef.current.files[0]);
      fd.append("bannerImg", this.imageRef.current.files[0]);
    }

    apiHandler
      .updateProducer(this.props.match.params.id, fd)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleFileSelect = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    this.setState({ url: url });
  };

  render() {
    if (!this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <form
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        className="center-column"
      >
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Nom de l'entreprise"
          value={this.state.companyName}
          type="text"
          id="companyName"
          name="companyName"
        />
        <LocationAutoComplete name="location" onSelect={this.handlePlace} />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Prénom"
          value={this.state.firstName}
          type="text"
          id="firstName"
          name="firstName"
        />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Nom de famille"
          value={this.state.lastName}
          type="text"
          id="lastName"
          name="lastName"
        />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Email"
          value={this.state.email}
          type="email"
          id="email"
          name="email"
        />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Numéro de téléphone"
          value={this.state.phoneNumber}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
        />
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Horaires"
          value={this.state.schedule}
          type="text"
          id="schedule"
          name="schedule"
        />
        <FormControl style={{ margin: "10px" }} variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
          <Select
            style={{ width: "195px" }}
            id="field"
            name="field"
            value={this.state.field}
            label="Type"
            onChange={this.handleChange}
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            <MenuItem value={"Boucherie"}>Boucherie</MenuItem>
            <MenuItem value={"Boulangerie"}>Boulangerie</MenuItem>
            <MenuItem value={"Caviste"}>Caviste</MenuItem>
            <MenuItem value={"Fromagerie"}>Fromagerie</MenuItem>
            <MenuItem value={"Maraîcher"}>Maraîcher</MenuItem>
            <MenuItem value={"Poissonnerie"}>Poissonnerie</MenuItem>
            <MenuItem value={"Primeur"}>Primeur</MenuItem>
          </Select>
        </FormControl>
        <TextField
          style={{ margin: "10px" }}
          variant="outlined"
          label="Description"
          value={this.state.description}
          type="text"
          id="description"
          name="description"
        />
        <img src={this.state.bannerImg} alt="old banner" />
        {this.state.url && <img src={this.state.url} alt="new banner" />}
        <div>
          <input
            onChange={this.handleFileSelect}
            type="file"
            ref={this.imageRef}
            id="icon-button-file"
            style={{ display: "none" }}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              style={style}
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera fontSize="large" />
            </IconButton>
          </label>
        </div>
        <Button style={{ margin: "10px" }} type="submit" variant="contained">
          Mettre à jour mon entreprise
        </Button>
      </form>
    );
  }
}

export default withRouter(FormEditCompany);
