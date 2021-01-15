import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Products from "./pages/Products/Products";
import ProducerLandingPage from "./pages/Producer/ProducerLandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/User/UserPage";
import FormRegisterCompany from "./components/Forms/FormRegisterCompany";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/producers" component={ProducerLandingPage} />
        <Route
          exact
          path="/producers/register"
          component={FormRegisterCompany}
        />
        <Route exact path="/products" component={Products} />
        <ProtectedRoute exact path="/profile" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
