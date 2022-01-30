import React, { Component } from "react";
import { createNewCustomer } from "./../customer-services/createNewCustomer";

class CreateCustomer extends Component {
  state = {
    username: this.props.username,
    userid: this.props.userid,
    newCustomer_firstname: "",
    newCustomer_lastname: "",
    newCustomer_adress: "",
    newCustomer_zip_city: "",
    newCustomer_birthdate: "",
    newCustomer_phone: "",
    newCustomer_mail: "",
    newCustomer_gender: "",
    newCustomer_createdBy: this.props.username,
  };

  handleNewCustomer_Firstname = (e) => {
    this.setState({ newCustomer_firstname: e.target.value });
  };
  handleNewCustomer_Lastname = (e) => {
    this.setState({ newCustomer_lastname: e.target.value });
  };
  handleNewCustomer_Adress = (e) => {
    this.setState({ newCustomer_adress: e.target.value });
  };
  handleNewCustomer_Zip_City = (e) => {
    this.setState({ newCustomer_zip_city: e.target.value });
  };
  handleNewCustomer_Birthdate = (e) => {
    this.setState({ newCustomer_birthdate: e.target.value });
  };
  handleNewCustomer_Phone = (e) => {
    this.setState({ newCustomer_phone: e.target.value });
  };
  handleNewCustomer_Mail = (e) => {
    this.setState({ newCustomer_mail: e.target.value });
  };
  handleNewCustomer_Gender = (e) => {
    this.setState({ newCustomer_gender: e.target.value });
  };

  render() {
    return (
      <div className="bg-dark settings-menu">
        <div className="p-3">
          <h2 className="text-light mb-5">Neukunde erfassen</h2>
          <label className="form-label text-light fw-bold fs-5">Vorname</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newCustomer_firstname}
            onChange={this.handleNewCustomer_Firstname}
          />
          <label className="form-label text-light fw-bold fs-5">Nachname</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newCustomer_lastname}
            onChange={this.handleNewCustomer_Lastname}
          />
          <label className="form-label text-light fw-bold fs-5">Adresse</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newCustomer_adress}
            onChange={this.handleNewCustomer_Adress}
          />
          <label className="form-label text-light fw-bold fs-5">PLZ/Ort</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newCustomer_zip_city}
            onChange={this.handleNewCustomer_Zip_City}
          />
          <label className="form-label text-light fw-bold fs-5">
            Geburtstag
          </label>
          <input
            type="date"
            className="form-control"
            value={this.state.newCustomer_birthdate}
            onChange={this.handleNewCustomer_Birthdate}
          />
          <label className="form-label text-light fw-bold fs-5">
            Telefonnummer
          </label>
          <input
            type="text"
            className="form-control"
            value={this.state.newCustomer_phone}
            onChange={this.handleNewCustomer_Phone}
          />
          <label className="form-label text-light fw-bold fs-5">
            Mailadresse
          </label>
          <input
            type="text"
            className="form-control"
            value={this.state.newCustomer_mail}
            onChange={this.handleNewCustomer_Mail}
          />
          <label className="form-label text-light fw-bold fs-5">
            Geschlecht
          </label>
          <input
            type="text"
            className="form-control"
            value={this.state.newCustomer_gender}
            onChange={this.handleNewCustomer_Gender}
          />
          <button
            className="btn btn-outline-light mt-3"
            onClick={() =>
              createNewCustomer(this.state).then(
                this.setState({
                  newCustomer_firstname: "",
                  newCustomer_lastname: "",
                  newCustomer_adress: "",
                  newCustomer_zip_city: "",
                  newCustomer_birthdate: "",
                  newCustomer_phone: "",
                  newCustomer_mail: "",
                  newCustomer_gender: "",
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

export default CreateCustomer;
