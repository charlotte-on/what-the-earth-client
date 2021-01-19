import React from "react";
import FormSignin from "../components/Forms/FormSignin";

const Signin = (props) => {
  return (
    <div className="center-column">
      <img
        style={{ width: "50px" }}
        src="/wheat.png"
        alt="Logo What the Earth"
      />
      <h1>Connectez-vous à votre espace utlisateur What the Earth.</h1>
      <FormSignin />
    </div>
  );
};

export default Signin;
