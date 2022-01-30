import React, { Component } from "react";
import { submitNewPassword } from "../setting-services/submitNewPassword";

class ChangePassword extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    newPassword: "",
  };

  handleNewPassword = (e) => {
    this.setState({ newPassword: e.target.value });
  };

  render() {
    return (
      <div className="bg-dark settings-menu">
        <div className="p-3">
          <h2 className="text-light mb-5">Passwort ändern</h2>
          <label className="form-label text-light fw-bold fs-5">
            Neues Passwort eingeben
          </label>
          <input
            type="password"
            className="form-control"
            value={this.state.newPassword}
            onChange={this.handleNewPassword}
          />
          <button
            className="btn btn-outline-light mt-3"
            onClick={() => {
              submitNewPassword(this.state).then(() => {
                this.setState({
                  newPassword: "",
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

export default ChangePassword;
