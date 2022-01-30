import React, { Component } from "react";
import { createNewTraining } from "../training-services/createNewTraining";

class CreateTraining extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    newTraining_tags: "",
    newTraining_date: "",
    newTraining_time: "",
    newTraining_loginExpireDate: "",
    newTraining_loginExpireTime: "",
    newTraining_maxMember: "",
    newTraining_createdBy: this.props.username,
  };

  handleNewTraining_Tags = (e) => {
    this.setState({ newTraining_tags: e.target.value });
  };
  handleNewTraining_Date = (e) => {
    this.setState({ newTraining_date: e.target.value });
  };
  handleNewTraining_Time = (e) => {
    this.setState({ newTraining_time: e.target.value });
  };
  handleNewTraining_LoginExpireDate = (e) => {
    this.setState({ newTraining_loginExpireDate: e.target.value });
  };
  handleNewTraining_LoginExpireTime = (e) => {
    this.setState({ newTraining_loginExpireTime: e.target.value });
  };
  handleNewTraining_MaxMember = (e) => {
    this.setState({ newTraining_maxMember: e.target.value });
  };

  render() {
    return (
      <div className="bg-dark settings-menu">
        <div className="p-3">
          <h2 className="text-light mb-5">Neues Training erstellen</h2>
          <label className="form-label text-light fw-bold fs-5">tags</label>
          <textarea
            type="text"
            className="form-control"
            value={this.state.newTraining_tags}
            onChange={this.handleNewTraining_Tags}
          />
          <label className="form-label text-light fw-bold fs-5">Datum</label>
          <input
            type="date"
            className="form-control"
            value={this.state.newTraining_date}
            onChange={this.handleNewTraining_Date}
          />
          <label className="form-label text-light fw-bold fs-5">Uhrzeit</label>
          <input
            type="time"
            className="form-control"
            value={this.state.newTraining_time}
            onChange={this.handleNewTraining_Time}
          />
          <label className="form-label text-light fw-bold fs-5">
            Anmeldefrist
          </label>
          <div className="d-flex justify-content-around">
            <input
              type="date"
              className="form-control"
              value={this.state.newTraining_loginExpireDate}
              onChange={this.handleNewTraining_LoginExpireDate}
            />
            <input
              type="time"
              className="form-control"
              value={this.state.newTraining_loginExpireTime}
              onChange={this.handleNewTraining_LoginExpireTime}
            />
          </div>
          <label className="form-label text-light fw-bold fs-5">
            Maximale Teilnehmer
          </label>
          <input
            type="number"
            className="form-control"
            value={this.state.newTraining_maxMember}
            onChange={this.handleNewTraining_MaxMember}
          />
          <button
            className="btn btn-outline-light mt-3"
            onClick={() => {
              createNewTraining(this.state).then(
                this.setState({
                  newTraining_tags: "",
                  newTraining_date: "",
                  newTraining_time: "",
                  newTraining_loginExpireDate: "",
                  newTraining_loginExpireTime: "",
                  newTraining_maxMember: "",
                })
              );
            }}
          >
            Speichern
          </button>
        </div>
      </div>
    );
  }
}

export default CreateTraining;
