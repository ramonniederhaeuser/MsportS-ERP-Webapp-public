import React, { Component } from "react";
import { showPricing } from "../accounting-services/accountingServices";
import { updatePricing } from "../accounting-services/updatePricing";
import { fetchPricing } from "./../common-services/fetchPricing";

class ChangePricing extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    pricings: [],
    editPricingID: "",
    updatePricing_value: "",
    updatePricing_updatedBy: this.props.username,
  };

  handleUpdatePricing_Value = (e) => {
    this.setState({ updatePricing_value: e.target.value });
  };

  renderTableData() {
    return this.state.pricings.map((pricing, index) => {
      const { id, subscription_type, subscription_price } = pricing;
      return (
        <tr key={id}>
          <td>
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button bg-dark text-info fw-bold"
                    onClick={() =>
                      showPricing(id, this.state).then((res) => {
                        if (res) {
                          this.setState({
                            editPricingID: res.editPricingID,
                            updatePricing_value: res.updatePricing_value,
                          });
                        } else {
                          this.setState({
                            editPricingID: "",
                            updatePricing_value: "",
                          });
                        }
                      })
                    }
                  >
                    {subscription_type === "subscription_10" ? (
                      <small>10er Abo CHF {subscription_price}</small>
                    ) : null}
                    {subscription_type === "subscription_30" ? (
                      <small>1 Monat CHF {subscription_price}</small>
                    ) : null}
                    {subscription_type === "subscription_180" ? (
                      <small>6 Monate CHF {subscription_price}</small>
                    ) : null}
                    {subscription_type === "subscription_365" ? (
                      <small>12 Monate CHF {subscription_price}</small>
                    ) : null}
                    {subscription_type === "subscription_mx" ? (
                      <small>MX Camp CHF {subscription_price}</small>
                    ) : null}
                    {subscription_type === "subscription_365_spez" ? (
                      <small>
                        12 Monate spezial Lizenzfahrer CHF {subscription_price}
                      </small>
                    ) : null}
                  </button>
                </h2>
                <div
                  className="accordion-collapse collapse"
                  id={id}
                  name="nameID"
                >
                  <div className="accordion-body bg-dark text-light fw-bold">
                    <label>Bitte neuen Preis eingeben</label>
                    <input
                      type="number"
                      step=".01"
                      className="form-control"
                      value={this.state.updatePricing_value}
                      onChange={this.handleUpdatePricing_Value}
                    />
                    <button
                      className="btn btn-outline-light mt-3"
                      onClick={() =>
                        updatePricing(this.state).then(() =>
                          fetchPricing().then((res) => {
                            this.setState(
                              {
                                pricings: res,
                              },
                              () => {
                                this.setState({
                                  editPricingID: "",
                                  updatePricing_value: "",
                                });
                              }
                            );
                          })
                        )
                      }
                    >
                      Speichern
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
    fetchPricing().then((res) => {
      this.setState({
        pricings: res,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="bg-dark settings-menu">
          <div className="p-3">
            <h2 className="text-light mb-5">Abo Preise bearbeiten</h2>
            {this.state.pricings.length > 0 ? (
              <div className="table-responsive border rounded">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Preise</th>
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

export default ChangePricing;
