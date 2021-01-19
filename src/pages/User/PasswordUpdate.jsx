import React from "react";
import { withUser } from "../../components/Auth/withUser";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class PasswordUpdate extends React.Component {
  return (

    <div>

    <div><h2>Modifier mon mot de passe</h2></div>

      <div>
        <h3>Ancien mot de passe</h3>
      </div>

      <div>
        <h3>Nouveau mot de passe</h3>
      </div>

      <div>
        <h3>Confirmer nouveau mot de passe</h3>
      </div>

      <div>
      <Link to={`/profile/${this.props.context.user._id}`}>
        <Button variant="contained">Enregistrer</Button>
      </Link>
    </div>
    
    </div>
  );
};

export default withUser(PasswordUpdate);
