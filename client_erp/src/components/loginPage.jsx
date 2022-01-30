import React from "react";
import icon180 from "../images/icons/Icon180.png";
import DoAuth from "./common/doAuth";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import baseURL from "../utils/API";

class LoginPage extends DoAuth {
  state = {
    username: "",
    userid: "",
    password: "",
    isAuth: false,
    hasPermission: false,
  };

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = async (e) => {
    // prevent default Event
    e.preventDefault();
    // call the Server
    try {
      const response = await axios.post(
        baseURL + "/admin/admin-login.php",
        this.state
      );
      if (response.data.success === 1) {
        toast.success("Erfolgreich angemeldet");
        localStorage.setItem("loginToken", response.data.token);
        this.setState({ isAuth: true });
      } else if (response.data.status === 422) {
        toast.warning("Falscher Benutzername oder Passwort!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.doAuth();
  }

  render() {
    if (this.state.isAuth === false)
      return (
        <div className="row" style={{ height: "100vh" }}>
          <div className="col-md-8 bg-dark">
            <div className="text-center pt-0 pt-lg-5">
              <span className="navbar-brand">
                <img src={icon180} alt="Company Logo"></img>
              </span>
              <h1 className="text-white display-3 fw-bold fst-italic mt-2">
                MsportS CRM
              </h1>
              <h2 className="text-white fw-bold fst-italic mt-3">
                Management System
              </h2>
              <Link to="/about" className="btn btn-light fw-bold mt-4">
                About MsportS
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="pt-0 pt-lg-5">
              <form onSubmit={this.handleSubmit}>
                <h1 className="mb-4 fw-bold display-4">Login</h1>
                <div className="mb-3">
                  <label className="form-label">Benutzername</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputUsername"
                    value={this.state.username}
                    onChange={this.handleUsername}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Passwort</label>
                  <input
                    type="password"
                    className="form-control"
                    name="inputPassword"
                    value={this.state.password}
                    onChange={this.handlePassword}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Einloggen
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    else return <Redirect to="/mainpage" />;
  }
}

export default LoginPage;
