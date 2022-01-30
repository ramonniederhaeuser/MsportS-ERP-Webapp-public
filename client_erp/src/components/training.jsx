import React from "react";
import DoAuth from "./common/doAuth";
import icon76 from "../images/icons/Icon76.png";
import CreateTraining from "./training-components/createTraining";
import ChangeTraining from "./training-components/changeTraining";
import TrainingArchive from "./training-components/trainingArchive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import {
  faArchive,
  faChevronLeft,
  faDumbbell,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

class Training extends DoAuth {
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
    if (param === "createTraining")
      this.setState({
        showCreateMenu: true,
        showEditMenu: false,
        showArchive: false,
      });
    if (param === "editTraining")
      this.setState({
        showCreateMenu: false,
        showEditMenu: true,
        showArchive: false,
      });
    if (param === "archive")
      this.setState({
        showCreateMenu: false,
        showEditMenu: false,
        showArchive: true,
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
          <h2 className="text-light">Trainings</h2>
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
            onClick={this.renderMenu("createTraining")}
          >
            <FontAwesomeIcon icon={faDumbbell} size="lg" className="me-3" />
            <strong className="fs-6">Training erstellen</strong>
          </button>
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("editTraining")}
          >
            <FontAwesomeIcon icon={faEdit} size="lg" className="me-3" />
            <strong className="fs-6">Training bearbeiten</strong>
          </button>
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("archive")}
          >
            <FontAwesomeIcon icon={faArchive} size="lg" className="me-3" />
            <strong className="fs-6">Training Archiv</strong>
          </button>
        </div>

        {/* Render Create Training Menu */}
        {this.state.showCreateMenu ? (
          <CreateTraining
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}

        {/* Render Edit Training Menu */}
        {this.state.showEditMenu ? (
          <ChangeTraining
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}

        {/* Render Archive Menu */}
        {this.state.showArchive ? (
          <TrainingArchive
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Training;
