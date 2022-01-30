import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { fetchTrainings } from "../common-services/fetchTrainings";
import { deleteTraining } from "../training-services/deleteTraining";
import {
  calculateDay,
  showTraining,
} from "../training-services/trainingServices";
import { updateTraining } from "../training-services/updateTraining";

class ChangeTraining extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    trainings: [],
    editTrainingID: "",
    updateTraining_tags: "",
    updateTraining_date: "",
    updateTraining_time: "",
    updateTraining_loginExpireDate: "",
    updateTraining_loginExpireTime: "",
    updateTraining_maxMember: "",
    updateTraining_updatedBy: this.props.username,
  };

  handleUpdateTraining_Tags = (e) => {
    this.setState({ updateTraining_tags: e.target.value });
  };
  handleUpdateTraining_Date = (e) => {
    this.setState({ updateTraining_date: e.target.value });
  };
  handleUpdateTraining_Time = (e) => {
    this.setState({ updateTraining_time: e.target.value });
  };
  handleUpdateTraining_LoginExpireDate = (e) => {
    this.setState({ updateTraining_loginExpireDate: e.target.value });
  };
  handleUpdateTraining_LoginExpireTime = (e) => {
    this.setState({ updateTraining_loginExpireTime: e.target.value });
  };
  handleUpdateTraining_MaxMember = (e) => {
    this.setState({ updateTraining_maxMember: e.target.value });
  };

  renderTableData() {
    return this.state.trainings.map((training, index) => {
      const { id, date, updatedBy, updatedAt } = training;
      const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, `-`);
      if (date >= currentDate) {
        return (
          <tr key={id}>
            <td>
              <div className="accordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button bg-dark text-light fw-bold"
                      onClick={() =>
                        showTraining(id, this.state).then((res) => {
                          if (res) {
                            this.setState({
                              editTrainingID: res.editTrainingID,
                              updateTraining_tags: res.updateTraining_tags,
                              updateTraining_date: res.updateTraining_date,
                              updateTraining_time: res.updateTraining_time,
                              updateTraining_loginExpireDate:
                                res.updateTraining_loginExpireDate,
                              updateTraining_loginExpireTime:
                                res.updateTraining_loginExpireTime,
                              updateTraining_maxMember:
                                res.updateTraining_maxMember,
                            });
                          } else {
                            this.setState({
                              editTrainingID: "",
                              updateTraining_tags: "",
                              updateTraining_date: "",
                              updateTraining_time: "",
                              updateTraining_loginExpireDate: "",
                              updateTraining_loginExpireTime: "",
                              updateTraining_maxMember: "",
                            });
                          }
                        })
                      }
                    >
                      {calculateDay(date)} {date}
                    </button>
                  </h2>
                  <div
                    className="accordion-collapse collapse"
                    id={id}
                    name="nameID"
                  >
                    <div className="accordion-body bg-dark text-dark fw-bold">
                      {updatedBy ? (
                        <p className="text-light">
                          ID {id}, zuletzt bearbeitet von {updatedBy},{" "}
                          {updatedAt}
                        </p>
                      ) : (
                        <p className="text-light">
                          ID {id}, noch nie bearbeitet
                        </p>
                      )}
                      <br />
                      <label className="form-label text-light fw-bold fs-5">
                        Tags
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        value={this.state.updateTraining_tags}
                        onChange={this.handleUpdateTraining_Tags}
                      />
                      <label className="form-label text-light fw-bold fs-5">
                        Datum
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={this.state.updateTraining_date}
                        onChange={this.handleUpdateTraining_Date}
                      />
                      <label className="form-label text-light fw-bold fs-5">
                        Uhrzeit
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        value={this.state.updateTraining_time}
                        onChange={this.handleUpdateTraining_Time}
                      />
                      <label className="form-label text-light fw-bold fs-5">
                        Anmeldefrist
                      </label>
                      <div className="d-flex justify-content-around">
                        <input
                          type="date"
                          className="form-control"
                          value={this.state.updateTraining_loginExpireDate}
                          onChange={this.handleUpdateTraining_LoginExpireDate}
                        />
                        <input
                          type="time"
                          className="form-control"
                          value={this.state.updateTraining_loginExpireTime}
                          onChange={this.handleUpdateTraining_LoginExpireTime}
                        />
                      </div>
                      <label className="form-label text-light fw-bold fs-5">
                        Maximale Teilnehmer
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={this.state.updateTraining_maxMember}
                        onChange={this.handleUpdateTraining_MaxMember}
                      />
                      <button
                        className="btn btn-outline-light mt-3 me-2"
                        onClick={() =>
                          updateTraining(this.state).then(() => {
                            fetchTrainings().then((res) => {
                              this.setState(
                                {
                                  trainings: res,
                                },
                                () => {
                                  this.setState({
                                    editTrainingID: "",
                                    updateTraining_tags: "",
                                    updateTraining_date: "",
                                    updateTraining_time: "",
                                    updateTraining_loginExpireDate: "",
                                    updateTraining_loginExpireTime: "",
                                    updateTraining_maxMember: "",
                                  });
                                }
                              );
                            });
                          })
                        }
                      >
                        Speichern
                      </button>
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() =>
                          deleteTraining(id).then(() => {
                            fetchTrainings().then((res) => {
                              this.setState({
                                trainings: res,
                              });
                            });
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faTrashAlt} size="2x" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        );
      }
      return null;
    });
  }

  componentDidMount() {
    fetchTrainings().then((res) => {
      this.setState({
        trainings: res,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="bg-dark settings-menu">
          <div className="p-3">
            <h2 className="text-light mb-5">Training bearbeiten</h2>
            {this.state.trainings.length > 0 ? (
              <div className="table-responsive border rounded">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Training</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderTableData()}</tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChangeTraining;
