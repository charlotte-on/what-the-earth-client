import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Products from "./pages/Products/Products";
import ProductPage from "./pages/Products/ProductPage";
import Simulator from "./pages/Products/Simulator";
import ProducerLandingPage from "./pages/Producer/ProducerLandingPage";
import ProducerDescriptionPage from "./pages/Producer/ProducerDescriptionPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/User/UserPage";
import UserUpdate from "./pages/User/UserUpdate";
import FormRegisterCompany from "./components/Forms/FormRegisterCompany";
import About from "./pages/About";

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
        <Route exact path="/products/simulator" component={Simulator} />
        <Route exact path="/products/:id" component={ProductPage} />
        <Route
          exact
          path="/producers/:id"
          component={ProducerDescriptionPage}
        />
        <ProtectedRoute exact path="/profile" component={UserPage} />
        <ProtectedRoute exact path="/profile/:id" component={UserUpdate} />
        <Route exact path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
