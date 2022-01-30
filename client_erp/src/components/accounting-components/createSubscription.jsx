import React, { Component } from "react";
import {
  calculateNone,
  calculatePaid,
  calculateUnpaid,
  showCustomer,
} from "../accounting-services/accountingServices";
import { updateCustomerAccounting } from "../accounting-services/updateCustomerAccounting";
import { fetchCustomers } from "../common-services/fetchCustomers";

class CreateSubscription extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    searchQuery: "",
    customers: [],
    editCustomerID: "",
    updateCustomer_subscriptionType: "",
    updateCustomer_updatedBy: this.props.username,
  };

  handleSelect = (e) => {
    this.setState({
      updateCustomer_subscriptionType: e.target.value,
    });
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
        const {
          id,
          firstname,
          lastname,
          subscriptionType,
          subscriptionPaid,
          subscriptionUntil,
          subscriptionQuantity,
          updatedBy,
          updatedAt,
        } = customer;
        return (
          <tr key={id}>
            <td>
              <div className="accordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    {/* Create Color if Subscription available or not */}
                    {/* has subscription and paid */}
                    {subscriptionType && subscriptionPaid ? (
                      <button
                        className="accordion-button bg-info text-light fw-bold"
                        onClick={() =>
                          showCustomer(id, this.state).then((res) => {
                            this.setState({
                              editCustomerID: res,
                            });
                          })
                        }
                      >
                        {firstname} {lastname}
                      </button>
                    ) : null}
                    {/* has subscription but not paid */}
                    {subscriptionType && !subscriptionPaid ? (
                      <button
                        className="accordion-button bg-warning text-light fw-bold"
                        onClick={() =>
                          showCustomer(id, this.state).then((res) => {
                            this.setState({
                              editCustomerID: res,
                            });
                          })
                        }
                      >
                        {firstname} {lastname}
                      </button>
                    ) : null}
                    {/* has no subscription */}
                    {!subscriptionType ? (
                      <button
                        className="accordion-button bg-danger text-light fw-bold"
                        onClick={() =>
                          showCustomer(id, this.state).then((res) => {
                            this.setState({
                              editCustomerID: res,
                            });
                          })
                        }
                      >
                        {firstname} {lastname}
                      </button>
                    ) : null}
                  </h2>
                  <div
                    className="accordion-collapse collapse"
                    id={id}
                    name="nameID"
                  >
                    <div className="accordion-body bg-dark text-light fw-bold">
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
                      {subscriptionType ? (
                        <div className="mb-3">
                          <label className="badge bg-secondary text-wrap">
                            Abo: {subscriptionType}
                          </label>
                          <br />
                          {subscriptionPaid ? (
                            <React.Fragment>
                              <label className="badge bg-secondary text-wrap">
                                Bezahlt: {subscriptionPaid}
                              </label>
                              <br />
                              <label className="badge bg-secondary text-wrap">
                                Gültig bis: {subscriptionUntil}
                              </label>
                              <br />
                              {subscriptionQuantity > 0 ? (
                                <label className="badge bg-secondary text-wrap">
                                  Restliche Trainings: {subscriptionQuantity}
                                </label>
                              ) : null}
                            </React.Fragment>
                          ) : (
                            <label className="badge bg-secondary text-wrap">
                              Bezahlt: Nein
                            </label>
                          )}
                          <br />
                        </div>
                      ) : null}
                      {/* Hide Form if subscription active */}
                      {!subscriptionType || !subscriptionPaid ? (
                        <React.Fragment>
                          <label className="form-label text-light fw-bold fs-5">
                            Bitte auswählen
                          </label>
                          <select
                            className="form-select"
                            onChange={this.handleSelect}
                          >
                            <option value=""></option>
                            <option value="10er Abo">10er Abo</option>
                            <option value="1 Monat">1 Monat</option>
                            <option value="6 Monate">6 Monate</option>
                            <option value="12 Monate">12 Monate</option>
                            <option value="12 Monate spez">
                              12 Monate spez. Lizenzfahrer
                            </option>
                            <option value="5 Monate">MX Camp</option>
                          </select>
                          <button
                            className="btn btn-outline-success mt-3"
                            onClick={() =>
                              updateCustomerAccounting(this.state).then(() =>
                                fetchCustomers().then((res) => {
                                  this.setState(
                                    {
                                      customers: res,
                                    },
                                    () => {
                                      this.setState({
                                        editCustomerID: "",
                                        updateCustomer_subscriptionType: "",
                                      });
                                    }
                                  );
                                })
                              )
                            }
                          >
                            Speichern
                          </button>
                        </React.Fragment>
                      ) : null}
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
            <h2 className="text-light mb-5">Abo erstellen</h2>
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
            <button className="btn btn-info disabled mb-2 position-relative me-3">
              Bezahlt{" "}
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                {calculatePaid(customers)}
              </span>
            </button>
            <button className="btn btn-warning disabled mb-2 position-relative me-3">
              Unbezahlt{" "}
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                {calculateUnpaid(customers)}
              </span>
            </button>
            <button className="btn btn-danger disabled mb-2 position-relative">
              Kein Abo{" "}
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                {calculateNone(customers)}
              </span>
            </button>
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

export default CreateSubscription;
