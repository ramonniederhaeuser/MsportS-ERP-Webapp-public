import React, { Component } from "react";
import { CSVLink } from "react-csv";
import {
  calculateBalance,
  calculateExpenditure,
  calculateRevenue,
  filterAccountings,
} from "../accounting-services/accountingServices";
import { fetchAccountings } from "../common-services/fetchAccountings";

class AccountingArchive extends Component {
  state = {
    accountings: [],
    searchQuery: "",
  };

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  renderTableData() {
    const { accountings, searchQuery } = this.state;
    return accountings
      .filter((accounting) => {
        if (searchQuery === "") {
          return accounting;
        } else if (
          accounting.bookingDate
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          accounting.bookingReason
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) {
          return accounting;
        }
        return false;
      })
      .map((accounting, index) => {
        const { id, bookingReason, bookingDate, createdAt, createdBy, amount } =
          accounting;
        const floatedAmount = parseFloat(amount).toFixed(2);
        return (
          <tr key={id}>
            <th>{id}</th>
            <td>{bookingReason}</td>
            <td>{bookingDate}</td>
            <td>
              <small className="text-secondary">
                {createdAt} freigegeben durch: {createdBy}
              </small>
            </td>
            {floatedAmount > 0 ? (
              <td className="text-info">CHF {floatedAmount}</td>
            ) : (
              <td className="text-danger">CHF {floatedAmount}</td>
            )}
          </tr>
        );
      });
  }

  componentDidMount() {
    fetchAccountings().then((res) => {
      this.setState({
        accountings: res,
      });
    });
  }

  render() {
    const { accountings, searchQuery } = this.state;
    return (
      <React.Fragment>
        <div className="bg-dark settings-menu">
          <div className="p-3">
            <h2 className="text-light mb-2">
              Balance: CHF {calculateBalance(accountings)}
            </h2>
            <h4 className="text-secondary mb-2">
              Einnahmen:{" "}
              <small className="text-secondary">
                CHF {calculateRevenue(accountings)}
              </small>
            </h4>
            <h4 className="text-secondary mb-4">
              Ausgaben:{" "}
              <small className="text-secondary">
                CHF {calculateExpenditure(accountings)}
              </small>
            </h4>
            <div className="d-inline-flex mb-2">
              <input
                type="text"
                className="form-control me-1"
                placeholder="filtern..."
                onChange={this.handleSearch}
                value={searchQuery}
              />
              {accountings.length > 0 ? (
                <CSVLink
                  data={filterAccountings(accountings, searchQuery)}
                  filename={"Buchungen.csv"}
                  className="btn btn-primary"
                  target="_blank"
                >
                  CSV
                </CSVLink>
              ) : null}
            </div>
            {accountings.length > 0 ? (
              <div className="table-responsive border rounded">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Nr.</th>
                      <th>Text</th>
                      <th>Bezahlt</th>
                      <th>Erstellt</th>
                      <th>Betrag</th>
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

export default AccountingArchive;
