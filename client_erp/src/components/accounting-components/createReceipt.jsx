import React, { Component } from "react";
import { createNewReceipt } from "./../accounting-services/createNewReceipt";

class CreateReceipt extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    newReceipt_createdBy: this.props.username,
    newReceipt_customerid: 0,
    newReceipt_firstname: "",
    newReceipt_lastname: "",
    newReceipt_adress: "",
    newReceipt_zip_city: "",
    newReceipt_phone: "",
    newReceipt_mail: "",
    newReceipt_productType: "",
    newReceipt_amount: "",
  };

  handleNewReceipt_Firstname = (e) => {
    this.setState({ newReceipt_firstname: e.target.value });
  };
  handleNewReceipt_Lastname = (e) => {
    this.setState({ newReceipt_lastname: e.target.value });
  };
  handleNewReceipt_Adress = (e) => {
    this.setState({ newReceipt_adress: e.target.value });
  };
  handleNewReceipt_Zip_City = (e) => {
    this.setState({ newReceipt_zip_city: e.target.value });
  };
  handleNewReceipt_Phone = (e) => {
    this.setState({ newReceipt_phone: e.target.value });
  };
  handleNewReceipt_Mail = (e) => {
    this.setState({ newReceipt_mail: e.target.value });
  };
  handleNewReceipt_ProductType = (e) => {
    this.setState({ newReceipt_productType: e.target.value });
  };
  handleNewReceipt_Amount = (e) => {
    this.setState({ newReceipt_amount: e.target.value });
  };

  render() {
    return (
      <div className="bg-dark settings-menu">
        <div className="p-3">
          <h2 className="text-light mb-5">Quittung erstellen</h2>
          <label className="form-label text-light fw-bold fs-5">Vorname</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newReceipt_firstname}
            onChange={this.handleNewReceipt_Firstname}
          />
          <label className="form-label text-light fw-bold fs-5">Nachname</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newReceipt_lastname}
            onChange={this.handleNewReceipt_Lastname}
          />
          <label className="form-label text-light fw-bold fs-5">Adresse</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newReceipt_adress}
            onChange={this.handleNewReceipt_Adress}
          />
          <label className="form-label text-light fw-bold fs-5">PLZ/Ort</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newReceipt_zip_city}
            onChange={this.handleNewReceipt_Zip_City}
          />
          <label className="form-label text-light fw-bold fs-5">
            Telefonnummer
          </label>
          <input
            type="text"
            className="form-control"
            value={this.state.newReceipt_phone}
            onChange={this.handleNewReceipt_Phone}
          />
          <label className="form-label text-light fw-bold fs-5">
            Mailadresse
          </label>
          <input
            type="text"
            className="form-control"
            value={this.state.newReceipt_mail}
            onChange={this.handleNewReceipt_Mail}
          />
          <label className="form-label text-light fw-bold fs-5">
            Produktetyp
          </label>
          <input
            type="text"
            className="form-control"
            value={this.state.newReceipt_productType}
            onChange={this.handleNewReceipt_ProductType}
          />
          <label className="form-label text-light fw-bold fs-5">Betrag</label>
          <input
            type="number"
            className="form-control"
            value={this.state.newReceipt_amount}
            onChange={this.handleNewReceipt_Amount}
          />
          <button
            className="btn btn-outline-light mt-3"
            onClick={() =>
              createNewReceipt(this.state).then(
                this.setState({
                  newReceipt_customerid: 0,
                  newReceipt_firstname: "",
                  newReceipt_lastname: "",
                  newReceipt_adress: "",
                  newReceipt_zip_city: "",
                  newReceipt_phone: "",
                  newReceipt_mail: "",
                  newReceipt_productType: "",
                  newReceipt_amount: "",
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

export default CreateReceipt;
