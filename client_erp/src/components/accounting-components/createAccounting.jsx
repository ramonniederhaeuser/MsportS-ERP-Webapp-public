import React, { Component } from "react";
import { createNewAccounting } from "./../accounting-services/createNewAccounting";

class CreateAccounting extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    newAccounting_bookingReason: "",
    newAccounting_bookingDate: "",
    newAccounting_amount: "",
    newAccounting_createdBy: this.props.username,
  };

  handleNewAccounting_BookingDate = (e) => {
    this.setState({ newAccounting_bookingDate: e.target.value });
  };
  handleNewAccounting_BookingReason = (e) => {
    this.setState({ newAccounting_bookingReason: e.target.value });
  };
  handleNewAccounting_Amount = (e) => {
    this.setState({ newAccounting_amount: e.target.value });
  };

  render() {
    return (
      <div className="bg-dark settings-menu">
        <div className="p-3">
          <h2 className="text-light mb-5">Neue Buchung eingeben</h2>
          <label className="form-label text-light fw-bold fs-5">
            Bezahlt am
          </label>
          <input
            type="date"
            className="form-control"
            value={this.state.newAccounting_bookingDate}
            onChange={this.handleNewAccounting_BookingDate}
          />
          <label className="form-label text-light fw-bold fs-5">
            Buchungsgrund
          </label>
          <textarea
            type="text"
            className="form-control"
            value={this.state.newAccounting_bookingReason}
            onChange={this.handleNewAccounting_BookingReason}
          />
          <label className="form-label text-light fw-bold fs-5">
            Betrag (bitte plus oder minus eingeben)
          </label>
          <input
            type="number"
            step=".01"
            className="form-control"
            value={this.state.newAccounting_amount}
            onChange={this.handleNewAccounting_Amount}
          />
          <button
            className="btn btn-outline-light mt-3"
            onClick={() =>
              createNewAccounting(this.state).then(
                this.setState({
                  newAccounting_bookingDate: "",
                  newAccounting_bookingReason: "",
                  newAccounting_amount: "",
                })
              )
            }
          >
            Speichern
          </button>
        </div>
      </div>
    );
  }
}

export default CreateAccounting;
