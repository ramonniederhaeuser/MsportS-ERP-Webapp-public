import React, { Component } from "react";
import { createNewUser } from "./../setting-services/createNewUser";

class CreateAccount extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    newUser_username: "",
    newUser_password: "",
  };

  handleNewUser_Username = (e) => {
    this.setState({ newUser_username: e.target.value });
  };
  handleNewUser_Password = (e) => {
    this.setState({ newUser_password: e.target.value });
  };

  render() {
    return (
      <div className="bg-dark settings-menu">
        <div className="p-3">
          <h2 className="text-light mb-5">Neuen Nutzer erstellen</h2>
          <label className="form-label text-light fw-bold fs-5">
            Benutzername
          </label>
          <input
            type="text"
            className="form-control"
            value={this.state.newUser_username}
            onChange={this.handleNewUser_Username}
          />
          <label className="form-label text-light fw-bold fs-5">Passwort</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newUser_password}
            onChange={this.handleNewUser_Password}
          />
          <button
            className="btn btn-outline-light mt-3"
            onClick={() => {
              createNewUser(this.state).then(() => {
                this.setState({
                  newUser_username: "",
                  newUser_password: "",
                });
              });
            }}
          >
            Speichern
          </button>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
