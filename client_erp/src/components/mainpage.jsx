import React from "react";
import DoAuth from "./common/doAuth";
import icon76 from "../images/icons/Icon76.png";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

class MainPage extends DoAuth {
  state = {
    username: "",
    userid: "",
    isAuth: undefined,
    hasPermission: false,
    showMenu: false,
  };

  componentDidMount() {
    this.doAuth();
  }

  handleDropdown = () => {
    !this.state.showMenu
      ? this.setState({ showMenu: true })
      : this.setState({ showMenu: false });
  };

  handleLogout = () => {
    localStorage.removeItem("loginToken");
    this.setState({ isAuth: false });
  };

  render() {
    if (!localStorage.getItem("loginToken") || this.state.isAuth === false)
      return <Redirect to="/" />;
    return (
      <React.Fragment>
        <div className="management-background">
          <div
            className="bg-dark p-2 d-flex justify-content-between align-items-center"
            style={{ height: "10vh", borderBottom: "1px solid white" }}
          >
            <div className="dropdown d-flex align-items-center">
              {/* Logo */}
              <img src={icon76} alt="Company Logo"></img>
            </div>
            {/* Dropdown Menu */}
            <div className="dropdown d-flex align-items-center">
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="text-light me-3"
              />
              <p className="fw-bold text-white fs-3 mb-0">
                {this.state.username}
              </p>
              <button className="btn text-light" onClick={this.handleDropdown}>
                {!this.state.showMenu ? (
                  <FontAwesomeIcon icon={faCaretDown} size="2x" />
                ) : (
                  <FontAwesomeIcon icon={faCaretUp} size="2x" />
                )}
              </button>
            </div>
          </div>
          {/* Render Dropdown Menu */}
          {this.state.showMenu ? (
            <div
              className="user-menu card m-1 position-absolute top-1 end-0 bg-secondary"
              style={{ width: "18rem" }}
            >
              {/* Navigation Links permissioned */}
              {this.state.hasPermission ? (
                <React.Fragment>
                  <Link to="/accounting" className="btn btn-outline-light m-1">
                    Buchhaltung
                  </Link>
                  <Link to="/customer" className="btn btn-outline-light m-1">
                    Kunden
                  </Link>
                </React.Fragment>
              ) : null}
              {/* Navigation Links unpermissioned */}
              <Link to="/training" className="btn btn-outline-light m-1">
                Training
              </Link>
              <Link to="/settings" className="btn btn-outline-light m-1">
                Einstellungen
              </Link>
              <Link to="/about" className="btn btn-outline-light m-1">
                About
              </Link>
              <button
                className="btn btn-outline-danger m-1"
                onClick={this.handleLogout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Ausloggen
              </button>
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;
