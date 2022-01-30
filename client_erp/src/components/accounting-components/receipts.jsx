import React, { Component } from "react";
import { fetchReceipts } from "../common-services/fetchReceipts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { markReceiptAsSent } from "../accounting-services/markReceiptAsSent";
import { generateInvoice } from "../accounting-services/generateInvoice";

class Receipts extends Component {
  state = {
    receipts: [],
    searchQuery: "",
    editReceiptID: "",
  };

  handleCheckbox = () => {
    const checkbox = document.getElementById("filterCheckbox");
    if (checkbox.checked) {
      this.setState({
        searchQuery: "n",
      });
    } else {
      this.setState({
        searchQuery: "",
      });
    }
  };

  componentDidMount() {
    fetchReceipts().then((res) => {
      this.setState({
        receipts: res,
      });
    });
  }

  renderTableData() {
    const { receipts, searchQuery } = this.state;
    return receipts
      .filter((receipt) => {
        if (searchQuery === "") {
          return receipt;
        } else if (receipt.sent.includes(searchQuery)) {
          return receipt;
        }
        return false;
      })
      .map((receipt, index) => {
        const {
          id,
          firstname,
          lastname,
          subscriptionType,
          subscriptionPaid,
          sent,
        } = receipt;
        return (
          <tr key={id}>
            <td>
              {firstname} {lastname} {subscriptionType} {subscriptionPaid}
            </td>
            <td>
              <button
                className="btn btn-info"
                onClick={() => generateInvoice(receipt)}
              >
                Quittung generieren
              </button>
            </td>
            <td>
              <button
                className={
                  sent === "y" ? "btn text-success" : "btn text-secondary"
                }
                onClick={() =>
                  markReceiptAsSent(id, sent).then(() => {
                    fetchReceipts().then((res) => {
                      this.setState({
                        receipts: res,
                      });
                    });
                  })
                }
              >
                <FontAwesomeIcon icon={faPaperPlane} size="2x" />
              </button>
            </td>
          </tr>
        );
      });
  }

  render() {
    const { receipts } = this.state;
    return (
      <React.Fragment>
        <div className="bg-dark settings-menu">
          <div className="p-3">
            <h2 className="text-light mb-5">Quittungen</h2>
            <div className="mb-3">
              <label className="form-check-label text-light me-1">
                Zeige nur ungesendete
              </label>
              <input
                type="checkbox"
                id="filterCheckbox"
                className="form-check-input"
                onChange={this.handleCheckbox}
              />
            </div>
            {receipts.length > 0 ? (
              <div className="table-responsive border rounded">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Daten</th>
                      <th></th>
                      <th>Gesendet</th>
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

export default Receipts;
