import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { fetchCustomers } from "../common-services/fetchCustomers";
import { deleteCustomer } from "../customer-services/deleteCustomer";
import { updateCustomer } from "../customer-services/updateCustomer";
import { showCustomer } from "../customer-services/customerServices";

class ChangeCustomer extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    searchQuery: "",
    customers: [],
    editCustomerID: "",
    updateCustomer_firstname: "",
    updateCustomer_lastname: "",
    updateCustomer_adress: "",
    updateCustomer_zip_city: "",
    updateCustomer_birthdate: "",
    updateCustomer_phone: "",
    updateCustomer_mail: "",
    updateCustomer_gender: "",
    updateCustomer_updatedBy: this.props.username,
  };

  handleUpdateCustomer_Firstname = (e) => {
    this.setState({ updateCustomer_firstname: e.target.value });
  };
  handleUpdateCustomer_Lastname = (e) => {
    this.setState({ updateCustomer_lastname: e.target.value });
  };
  handleUpdateCustomer_Adress = (e) => {
    this.setState({ updateCustomer_adress: e.target.value });
  };
  handleUpdateCustomer_Zip_City = (e) => {
    this.setState({ updateCustomer_zip_city: e.target.value });
  };
  handleUpdateCustomer_Birthdate = (e) => {
    this.setState({ updateCustomer_birthdate: e.target.value });
  };
  handleUpdateCustomer_Phone = (e) => {
    this.setState({ updateCustomer_phone: e.target.value });
  };
  handleUpdateCustomer_Mail = (e) => {
    this.setState({ updateCustomer_mail: e.target.value });
  };
  handleUpdateCustomer_Gender = (e) => {
    this.setState({ updateCustomer_gender: e.target.value });
  };
  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  renderTableData() {
    const { customers, searchQuery } = this.state;
    return customers
      .filter((customer) => {
        if (searchQuery === "") {
          return customer;
        } else if (
          customer.firstname
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          customer.lastname.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return customer;
        }
        return false;
      })
      .map((customer, index) => {
        const { id, firstname, lastname, updatedBy, updatedAt } = customer;
        return (
          <tr key={id}>
            <td>
              <div className="accordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button bg-dark text-light fw-bold"
                      onClick={() =>
                        showCustomer(id, this.state).then((res) => {
                          if (res) {
                            this.setState({
                              editCustomerID: res.editCustomerID,
                              updateCustomer_firstname:
                                res.updateCustomer_firstname,
                              updateCustomer_lastname:
                                res.updateCustomer_lastname,
                              updateCustomer_adress: res.updateCustomer_adress,
                              updateCustomer_zip_city:
                                res.updateCustomer_zip_city,
                              updateCustomer_birthdate:
                                res.updateCustomer_birthdate,
                              updateCustomer_phone: res.updateCustomer_phone,
                              updateCustomer_mail: res.updateCustomer_mail,
                              updateCustomer_gender: res.updateCustomer_gender,
                            });
                          } else {
                            this.setState({
                              editCustomerID: "",
                              updateCustomer_firstname: "",
                              updateCustomer_lastname: "",
                              updateCustomer_adress: "",
                              updateCustomer_zip_city: "",
                              updateCustomer_birthdate: "",
                              updateCustomer_phone: "",
                              updateCustomer_mail: "",
                              updateCustomer_gender: "",
                            });
                          }
                        })
                      }
                    >
                      {firstname} {lastname}
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
                        Vorname
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.updateCustomer_firstname}
                        onChange={this.handleUpdateCustomer_Firstname}
                      />
                      <label className="form-label text-light fw-bold fs-5">
                        Nachname
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.updateCustomer_lastname}
                        onChange={this.handleUpdateCustomer_Lastname}
                      />
                      <label className="form-label text-light fw-bold fs-5">
                        Adresse
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.updateCustomer_adress}
                        onChange={this.handleUpdateCustomer_Adress}
                      />
                      <label className="form-label text-light fw-bold fs-5">
                        PLZ/Ort
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.updateCustomer_zip_city}
                        onChange={this.handleUpdateCustomer_Zip_City}
                      />
                      <label className="form-label text-light fw-bold fs-5">
                        Geburtstag
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={this.state.updateCustomer_birthdate}
                        onChange={this.handleUpdateCustomer_Birthdate}
                      />
                      <label className="form-label text-light fw-bold fs-5">
                        Telefonnummer
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.updateCustomer_phone}
                        onChange={this.handleUpdateCustomer_Phone}
                      />
                      <label className="form-label text-light fw-bold fs-5">
                        Mailadresse
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.updateCustomer_mail}
                        onChange={this.handleUpdateCustomer_Mail}
                      />
                      <label className="form-label text-light fw-bold fs-5">
                        Geschlecht
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.updateCustomer_gender}
                        onChange={this.handleUpdateCustomer_Gender}
                      />
                      <button
                        className="btn btn-outline-light mt-3 me-3"
                        onClick={() =>
                          updateCustomer(this.state).then(() => {
                            fetchCustomers().then((res) => {
                              this.setState(
                                {
                                  customers: res,
                                },
                                () => {
                                  this.setState({
                                    editCustomerID: "",
                                    updateCustomer_firstname: "",
                                    updateCustomer_lastname: "",
                                    updateCustomer_adress: "",
                                    updateCustomer_zip_city: "",
                                    updateCustomer_birthdate: "",
                                    updateCustomer_phone: "",
                                    updateCustomer_mail: "",
                                    updateCustomer_gender: "",
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
                          deleteCustomer(id).then(() =>
                            fetchCustomers().then((res) => {
                              this.setState({
                                customers: res,
                              });
                            })
                          )
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
      });
  }

  componentDidMount() {
    fetchCustomers().then((res) => {
      this.setState({
        customers: res,
      });
    });
  }

  render() {
    const { customers, searchQuery } = this.state;
    return (
      <React.Fragment>
        <div className="bg-dark settings-menu">
          <div className="p-3">
            <h2 className="text-light mb-2">Kundenstamm bearbeiten</h2>
            <div className="col-12 mb-3">
              <div className="d-inline-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="suchen..."
                  onChange={this.handleSearch}
                  value={searchQuery}
                />
              </div>
            </div>
            <h3 className="text-secondary mb-3">
              {customers.length} Einträge gefunden
            </h3>
            {customers.length > 0 ? (
              <div className="table-responsive border rounded">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Kundenstamm</th>
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

export default ChangeCustomer;
