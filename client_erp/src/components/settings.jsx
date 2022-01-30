import React from "react";
import DoAuth from "./common/doAuth";
import icon76 from "../images/icons/Icon76.png";
import ChangeUsername from "./setting-components/changeUsername";
import ChangePassword from "./setting-components/changePassword";
import CreateAccount from "./setting-components/createAccount";
import ManageAccounts from "./setting-components/manageAccounts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import {
  faChevronLeft,
  faKey,
  faUser,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

class Settings extends DoAuth {
  state = {
    username: "",
    userid: "",
    isAuth: undefined,
    hasPermission: false,
    showUsernameMenu: false,
    showPasswordMenu: false,
    showAccountMenu: false,
    showUsersMenu: false,
  };

  componentDidMount() {
    this.doAuth();
  }
  // Render Menu
  renderMenu = (param) => (e) => {
    e.preventDefault();
    if (param === "username")
      this.setState({
        showUsernameMenu: true,
        showPasswordMenu: false,
        showAccountMenu: false,
        showUsersMenu: false,
      });
    if (param === "password")
      this.setState({
        showUsernameMenu: false,
        showPasswordMenu: true,
        showAccountMenu: false,
        showUsersMenu: false,
      });
    if (param === "account")
      this.setState({
        showUsernameMenu: false,
        showPasswordMenu: false,
        showAccountMenu: true,
        showUsersMenu: false,
      });
    if (param === "users")
      this.setState({
        showUsernameMenu: false,
        showPasswordMenu: false,
        showAccountMenu: false,
        showUsersMenu: true,
      });
  };

  render() {
    if (!localStorage.getItem("loginToken") || this.state.isAuth === false)
      return <Redirect to="/" />;
    return (
      <React.Fragment>
        {/* Header */}
        <div
          className="bg-dark p-2 d-flex justify-content-between align-items-center"
          style={{ height: "10vh" }}
        >
          <img src={icon76} alt="Company Logo"></img>
          <h2 className="text-light">Einstellungen</h2>
          <Link
            to="/mainpage"
            className="btn text-light"
            style={{ borderLeft: "2px solid white" }}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </Link>
        </div>

        {/* Upper Side Menu */}
        <div className="d-flex flex-column align-items-start flex-lg-row justify-content-lg-start p-1 bg-secondary">
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("username")}
          >
            <FontAwesomeIcon icon={faUser} size="lg" className="me-3" />
            <strong className="fs-6">Benutzername</strong>
          </button>
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("password")}
          >
            <FontAwesomeIcon icon={faKey} size="lg" className="me-3" />
            <strong className="fs-6">Passwort</strong>
          </button>
          {/* Conditional Rendering if has Permission */}
          {this.state.hasPermission ? (
            <React.Fragment>
              <button
                className="btn text-white my-1"
                onClick={this.renderMenu("account")}
              >
                <FontAwesomeIcon icon={faUserPlus} size="lg" className="me-3" />
                <strong className="fs-6">Neuer Account</strong>
              </button>
              <button
                className="btn text-white my-1"
                onClick={this.renderMenu("users")}
              >
                <FontAwesomeIcon icon={faUsers} size="lg" className="me-3" />
                <strong className="fs-6">Nutzerverwaltung</strong>
              </button>
            </React.Fragment>
          ) : null}
        </div>

        {/* Render Username Menu */}
        {this.state.showUsernameMenu ? (
          <ChangeUsername
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}

        {/* Render Password Menu */}
        {this.state.showPasswordMenu ? (
          <ChangePassword
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}

        {/* Render Account Menu */}
        {this.state.showAccountMenu ? (
          <CreateAccount
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}

        {/* Render Users Menu */}
        {this.state.showUsersMenu ? <ManageAccounts /> : null}
      </React.Fragment>
    );
  }
}

export default Settings;
