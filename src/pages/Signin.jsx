import React from "react";
import { Link } from "react-router-dom";
import FormSignin from "../components/Forms/FormSignin";

const Signin = (props) => {
  return (
    <div>
      <div style={{position: "absolute", padding: "15px",}}>
        <Link to={"/"}>
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
          Accueil / Identification utilisateur
        </p>
      </div>

      <div className="center-column" style={{paddingTop: "20%"}}>
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
          Connectez-vous à votre espace utlisateur What the Earth
        </h2>
        <FormSignin />
      </div>
    </div>
  );
};

export default Signin;
