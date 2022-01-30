import React, { Component } from "react";
import { prepareAndReleaseSubscription } from "../accounting-services/prepareAndReleaseSubscription";
import { fetchCustomers } from "../common-services/fetchCustomers";

class ReleaseSubscription extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    customers: [],
    updateCustomer_updatedBy: this.props.username,
  };

  componentDidMount() {
    fetchCustomers().then((res) => {
      this.setState({
        customers: res,
      });
    });
  }

  renderTableData() {
    return this.state.customers.map((customer, index) => {
      const { id, firstname, lastname, subscriptionType, subscriptionPaid } =
        customer;
      if (subscriptionType && !subscriptionPaid) {
        return (
          <tr key={id}>
            <td>
              <div className="fw-bold d-flex justify-content-between">
                {firstname} {lastname} {subscriptionType}
                <button
                  type="btn btn-danger"
                  className="btn btn-danger"
                  onClick={() =>
                    prepareAndReleaseSubscription(id, this.state).then(() =>
                      fetchCustomers().then((res) => {
                        this.setState({
                          customers: res,
                        });
                      })
                    )
                  }
                >
                  Freigeben
                </button>
              </div>
            </td>
          </tr>
        );
      }
      return null;
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="bg-dark settings-menu">
          <div className="p-3">
            <h2 className="text-light mb-5">Bezahlung freigeben</h2>
            {this.state.customers.length > 0 ? (
              <div className="table-responsive border rounded">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Freizugebende Buchungen</th>
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

export default ReleaseSubscription;
