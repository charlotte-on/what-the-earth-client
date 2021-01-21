import React from "react";
import FormSigninProducer from "../components/Forms/FormSigninProducer";
import { Link } from "react-router-dom";

const Signin = (props) => {
  return (
    <div>
      <div>
        <Link to={"/"}>
          <h4
            style={{
              textAlign: "left",
              top: "calc(2% - 200px)",
              fontSize: "13px",
            }}
          >
            Retour
          </h4>
        </Link>

        <p
          style={{
            textAlign: "left",
            top: "calc(2% - 180px)",
            fontSize: "11px",
          }}
        >
          Accueil / Identification professionnelle
        </p>
      </div>
      <div className="center-column">
        <img
          style={{ width: "50px" }}
          src="/wheat.png"
          alt="Logo What the Earth"
        />
        <h2
          style={{
            padding: "10px",
            textAlign: "center",
          }}
        >
          Connectez-vous à votre espace pro What the Earth
        </h2>
        <FormSigninProducer />
      </div>
    </div>
  );
};

export default Signin;
