import React, { Component } from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import ScheduleIcon from "@material-ui/icons/Schedule";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export class ProducerLandingPage extends Component {
  state = {
    allProducers: [],
    filteredProducers: [],
    selectedProducer: null,
    position: [2.3315, 48.8567],
  };

  componentDidMount() {
    document.title = "What the Earth • Les producteurs";
    apiHandler
      .getProducers()
      .then((producers) => {
        this.setState({
          allProducers: producers,
          filteredProducers: producers,
        });
      })
      .catch((err) => console.log(err));

    const success = (pos) => {
      var crd = pos.coords;
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude : ${crd.longitude}`);
      this.setState({ position: [crd.longitude, crd.latitude] });
    };

    const error = (err) => {
      console.warn(`ERREUR (${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }

  handleFilter = (event) => {
    if (event.target.value) {
      this.setState({
        filteredProducers: this.state.allProducers.filter(
          (producer) => producer.field === event.target.value
        ),
        selectedProducer: null,
      });
    } else {
      this.setState({
        filteredProducers: this.state.allProducers,
        selectedProducer: null,
      });
    }
  };

  render() {
    return (
      <div>
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/light-v10"
          containerStyle={{
            height: "50vh",
            width: "100vw",
          }}
          center={this.state.position}
        >
          {this.state.filteredProducers.map((producer) => (
            <Marker
              key={producer._id}
              coordinates={producer.location.coordinates}
              offsetTop={-48}
              offsetLeft={-24}
              onClick={() => {
                if (this.state.selectedProducer === null) {
                  this.setState({ selectedProducer: producer });
                } else {
                  this.setState({ selectedProducer: null });
                }
              }}
            >
              <img
                style={{ width: "40px" }}
                src="/media/marker.png"
                alt={producer.companyName}
              />
            </Marker>
          ))}
          {this.state.selectedProducer !== null && (
            <Popup
              coordinates={this.state.selectedProducer.location.coordinates}
              offset={{
                "bottom-left": [12, -38],
                bottom: [0, -38],
                "bottom-right": [-12, -38],
              }}
            >
              <p>{this.state.selectedProducer.companyName}</p>
              <p>{this.state.selectedProducer.field}</p>
              <p>{this.state.selectedProducer.formattedAddress}</p>
              <Link
                className="link-underlined"
                to={`/producers/${this.state.selectedProducer._id}`}
              >
                Je découvre
              </Link>
            </Popup>
          )}
        </Map>
        <FormControl
          style={{ margin: "10px", width: "80%", margin: "10px 10% 0 10%" }}
          variant="outlined"
        >
          <InputLabel id="demo-simple-select-outlined-label">Filtre</InputLabel>
          <Select
            id="selectedFilter"
            name="selectedFilter"
            label="Filtre"
            onChange={this.handleFilter}
            // value={this.state.selectedFilter}
          >
            <MenuItem value={false}>Tous les commerces</MenuItem>
            <MenuItem value={"Fromagerie"}>Fromager</MenuItem>
            <MenuItem value={"Boulangerie"}>Boulanger</MenuItem>
            <MenuItem value={"Poissonnerie"}>Poissonier</MenuItem>
            <MenuItem value={"Boucherie"}>Boucher</MenuItem>
            <MenuItem value={"Maraîcher"}>Maraîcher</MenuItem>
            <MenuItem value={"Primeur"}>Primeur</MenuItem>
            <MenuItem value={"Caviste"}>Caviste</MenuItem>
          </Select>
        </FormControl>
        <div className="scrolling-wrapper">
          {this.state.filteredProducers.map((producer) => (
            <div className="producer" key={producer._id}>
              <div
                style={{
                  width: "auto",
                  height: "125px",
                  backgroundImage: `url(${producer.bannerImg})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <p>{producer.companyName}</p>
              <p>{producer.field}</p>
              <p>{producer.formattedAddress}</p>
              <p>
                <ScheduleIcon />
                {producer.schedule}
              </p>
              <Link
                className="link-underlined"
                to={`/producers/${producer._id}`}
              >
                View more
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProducerLandingPage;
