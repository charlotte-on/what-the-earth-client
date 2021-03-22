import React, { Component } from "react";
import { PieChart, Pie, Cell } from "recharts";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Tooltip } from "@material-ui/core";

const EPF = `Sans unité, plus le score est bas plus son impact sur l'environnement est faible. Ce score unique est une moyenne pondérée des 16 indicateurs (voir tableau ci-dessous), calculé selon la méthodologie européenne « PEF » (Product Environmental Footprint).`;

export class Result extends Component {
  state = {
    recipe: null,
  };

  componentDidMount = () => {
    apiHandler
      .getResult(this.props.match.params.id)
      .then((recipe) => {
        this.setState({ recipe });
      })
      .catch((err) => console.log(err));
  };

  getDividedResult = () => {
    function divide(array) {
      return array.reduce(function (acc, product) {
        let result =
          (product.qty / 1000) *
          product.impact_environnemental["Score unique EF"].synthese;
        return result + acc;
      }, 0);
    }

    const converted = this.convertArray(this.state.recipe.products);

    return divide(converted);
  };

  convertArray = (array) => {
    const convertedArray = Object.keys(array[0]).map((key) => {
      return array[0][key];
    });
    return convertedArray;
  };

  splitName = (string) => {
    let name = string.split(" ");
    return name[0].replace(/,/g, "");
  };

  getAllResults = () => {
    let numbers = [
      ...this.convertArray(this.state.recipe.products).map((prod) => {
        return {
          value:
            Math.round(
              (prod.qty / 1000) *
                prod.impact_environnemental["Score unique EF"].synthese *
                100
            ) / 100,
          name: this.splitName(prod.nom_francais),
        };
      }),
    ];
    return numbers;
  };

  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  roundNumber = (number) => {
    return number.toFixed([2]);
  };

  coloredNumber = (number) => {
    if (number < 0.5) return "green";
    else if (number >= 0.5 && number < 1.5) return "orange";
    else return "red";
  };

  render() {
    if (!this.state.recipe) {
      return (
        <img src="/media/loading.gif" alt="loading icon" className="loading" />
      );
    }

    //console.log(this.getAllResults());

    return (
      <div>
        <div style={{ position: "absolute", padding: "15px" }}>
          <Link to={"/products/simulator"}>
            <h4
              style={{
                textAlign: "left",
                fontSize: "13px",
              }}
            >
              Retour
            </h4>
          </Link>

          <p
            style={{
              textAlign: "left",
              fontSize: "11px",
            }}
          >
            Accueil / Produits / Simulateur / Résultat
          </p>
        </div>
        <div className="result-page">
          <h2
            style={{
              padding: "20% 20% 0 20%",
              textAlign: "center",
            }}
          >
            Résultat de la simulation
          </h2>
          <h2>Ingrédients:</h2>

          <ul className="ingredients-list">
            {this.convertArray(this.state.recipe.products).map((prod) => {
              return (
                <li>
                  {prod.nom_francais} :{" "}
                  {this.roundNumber(
                    (prod.qty / 1000) *
                      prod.impact_environnemental["Score unique EF"].synthese
                  )}
                </li>
              );
            })}
          </ul>
          <h3>
            Score EPF total:{" "}
            <span
              style={{ color: this.coloredNumber(this.getDividedResult()) }}
            >
              {this.roundNumber(this.getDividedResult())}
            </span>
            <Tooltip title={EPF} enterTouchDelay={100} leaveDelay={17000}>
              <InfoOutlinedIcon fontSize={"small"} />
            </Tooltip>
          </h3>

          <h3
            style={{
              marginTop: "25px",
              textAlign: "center",
            }}
            className="pie-title"
          >
            Répartition par produit
          </h3>

          <PieChart width={375} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
              data={this.getAllResults()}
              cx={170}
              cy={140}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              label={(entry) => entry.name}
              dataKey="value"
            >
              {this.getAllResults().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={this.getRandomColor()} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    );
  }
}

export default Result;
