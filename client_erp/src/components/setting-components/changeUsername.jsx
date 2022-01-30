import React, { Component } from "react";
import { submitNewUsername } from "../setting-services/submitNewUsername";

class ChangeUsername extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    newUsername: "",
  };

  handleNewUsername = (e) => {
    this.setState({ newUsername: e.target.value });
  };

  render() {
    return (
      <div className="bg-dark settings-menu">
        <div className="p-3">
          <h2 className="text-light mb-5">Benutzernamen ändern</h2>
          <label className="form-label text-light fw-bold fs-5">
            Neuen Benutzernamen eingeben
          </label>
          <input
            type="text"
            className="form-control"
            value={this.state.newUsername}
            onChange={this.handleNewUsername}
          />
          <button
            className="btn btn-outline-light mt-3"
            onClick={() => {
              submitNewUsername(this.state).then(() => {
                this.setState({
                  newUsername: "",
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

export default ChangeUsername;
