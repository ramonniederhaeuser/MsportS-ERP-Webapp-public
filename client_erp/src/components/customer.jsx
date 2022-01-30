import React from "react";
import DoAuth from "./common/doAuth";
import icon76 from "../images/icons/Icon76.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import CreateCustomer from "./customer-components/createCustomer";
import ChangeCustomer from "./customer-components/changeCustomer";
import {
  faChevronLeft,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

class Customer extends DoAuth {
  state = {
    username: "",
    userid: "",
    isAuth: undefined,
  };

  componentDidMount() {
    this.doAuth();
  }

  // Render Menu
  renderMenu = (param) => (e) => {
    e.preventDefault();
    if (param === "createCustomer")
      this.setState({
        showCreateMenu: true,
        showEditMenu: false,
      });
    if (param === "editCustomer") {
      this.setState({
        showCreateMenu: false,
        showEditMenu: true,
      });
    }
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
          <h2 className="text-light">Kundenstamm</h2>
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
            onClick={this.renderMenu("createCustomer")}
          >
            <FontAwesomeIcon icon={faUser} size="lg" className="me-3" />
            <strong className="fs-6">Kunde erstellen</strong>
          </button>
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("editCustomer")}
          >
            <FontAwesomeIcon icon={faUsers} size="lg" className="me-3" />
            <strong className="fs-6">Kundenstamm bearbeiten</strong>
          </button>
        </div>

        {/* Render Create Customer Menu */}
        {this.state.showCreateMenu ? (
          <CreateCustomer
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}

        {/* Render Edit Training Menu */}
        {this.state.showEditMenu ? (
          <ChangeCustomer
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Customer;
