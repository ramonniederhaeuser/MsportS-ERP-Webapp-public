import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { fetchUsers } from "../setting-services/fetchUsers";
import { deleteUser } from "../setting-services/deleteUser";
import { authUser } from "../setting-services/authUser";

class ManageAccounts extends Component {
  state = { users: [] };

  renderTableData() {
    return this.state.users.map((user, index) => {
      const { id, username, auth } = user;
      return (
        <tr key={id}>
          <th className="align-middle fs-5 fw-bold" scope="row">
            {id}
          </th>
          <td className="align-middle fs-5 fw-bold">{username}</td>
          <td>
            {username !== "admin" ? (
              <React.Fragment>
                <button
                  className="btn text-danger"
                  onClick={() =>
                    deleteUser(id).then(() => {
                      fetchUsers().then((res) => {
                        this.setState({
                          users: res,
                        });
                      });
                    })
                  }
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="2x" />
                </button>
                <button
                  className={
                    auth === "y" ? "btn text-success" : "btn text-secondary"
                  }
                  onClick={() =>
                    authUser(id, auth).then(() => {
                      fetchUsers().then((res) => {
                        this.setState({
                          users: res,
                        });
                      });
                    })
                  }
                >
                  <FontAwesomeIcon icon={faKey} size="2x" />
                </button>
              </React.Fragment>
            ) : null}
          </td>
        </tr>
      );
    });
  }

  componentDidMount() {
    fetchUsers().then((res) => {
      this.setState({
        users: res,
      });
    });
  }

  render() {
    const { users } = this.state;
    return (
      <React.Fragment>
        <div className="bg-dark settings-menu">
          <div className="p-3">
            <h2 className="text-light mb-5">Nutzerverwaltung</h2>
          </div>
          {users ? (
            <div className="container border rounded">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">Benutzer ID</th>
                    <th scope="col">Benutzername</th>
                    <th scope="col">Aktion</th>
                  </tr>
                </thead>
                <tbody>{this.renderTableData()}</tbody>
              </table>
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default ManageAccounts;
