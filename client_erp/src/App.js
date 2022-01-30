import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/not-found";
import LoginPage from "./components/loginPage";
import About from "./components/about";
import MainPage from "./components/mainpage";
import Settings from "./components/settings";
import Training from "./components/training";
import Customer from "./components/customer";
import Accounting from "./components/accounting";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Switch>
        <Route path="/loginpage" component={LoginPage} />
        <Route path="/about" component={About} />
        <Route path="/mainpage" component={MainPage} />
        <Route path="/settings" component={Settings} />
        <Route path="/training" component={Training} />
        <Route path="/customer" component={Customer} />
        <Route path="/accounting" component={Accounting} />
        <Route path="/er404" component={NotFound} />
        <Redirect from="/" exact to="/loginpage" />
        <Redirect from="" exact to="/loginpage" />
        <Redirect to="/er404" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
