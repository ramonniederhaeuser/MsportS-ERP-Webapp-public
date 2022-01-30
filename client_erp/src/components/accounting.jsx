import React from "react";
import DoAuth from "./common/doAuth";
import icon76 from "../images/icons/Icon76.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import CreateSubscription from "./accounting-components/createSubscription";
import ReleaseSubscription from "./accounting-components/releaseSubscription";
import AccountingArchive from "./accounting-components/accountingArchive";
import CreateAccounting from "./accounting-components/createAccounting";
import ChangePricing from "./accounting-components/changePricing";
import Receipts from "./accounting-components/receipts";
import CreateReceipt from "./accounting-components/createReceipt";
import {
  faBookMedical,
  faBookOpen,
  faCartPlus,
  faCashRegister,
  faChevronLeft,
  faDollarSign,
  faFileInvoice,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";

class Accounting extends DoAuth {
  state = {
    username: "",
    userid: "",
    isAuth: undefined,
  };

  componentDidMount() {
    this.doAuth();
  }

  // Render Menu
  renderMenu = (param) => (e) => {
    e.preventDefault();
    if (param === "createSubscription")
      this.setState({
        showSubscriptionMenu: true,
        showReleaseMenu: false,
        showArchive: false,
        showCreateAccountingMenu: false,
        showEditPricingMenu: false,
        showReceiptMenu: false,
        createReceiptMenu: false,
      });
    if (param === "releaseSubscription")
      this.setState({
        showSubscriptionMenu: false,
        showReleaseMenu: true,
        showArchive: false,
        showCreateAccountingMenu: false,
        showEditPricingMenu: false,
        showReceiptMenu: false,
        createReceiptMenu: false,
      });
    if (param === "showArchive")
      this.setState({
        showSubscriptionMenu: false,
        showReleaseMenu: false,
        showArchive: true,
        showCreateAccountingMenu: false,
        showEditPricingMenu: false,
        showReceiptMenu: false,
        createReceiptMenu: false,
      });
    if (param === "createAccounting")
      this.setState({
        showSubscriptionMenu: false,
        showReleaseMenu: false,
        showArchive: false,
        showCreateAccountingMenu: true,
        showEditPricingMenu: false,
        showReceiptMenu: false,
        createReceiptMenu: false,
      });
    if (param === "editPricing")
      this.setState({
        showSubscriptionMenu: false,
        showReleaseMenu: false,
        showArchive: false,
        showCreateAccountingMenu: false,
        showEditPricingMenu: true,
        showReceiptMenu: false,
        createReceiptMenu: false,
      });
    if (param === "showReceipts")
      this.setState({
        showSubscriptionMenu: false,
        showReleaseMenu: false,
        showArchive: false,
        showCreateAccountingMenu: false,
        showEditPricingMenu: false,
        showReceiptMenu: true,
        createReceiptMenu: false,
      });
    if (param === "createReceipt")
      this.setState({
        showSubscriptionMenu: false,
        showReleaseMenu: false,
        showArchive: false,
        showCreateAccountingMenu: false,
        showEditPricingMenu: false,
        showReceiptMenu: false,
        createReceiptMenu: true,
      });
  };

  render() {
    if (!localStorage.getItem("loginToken") || this.state.isAuth === false)
      return <Redirect to="/" />;
    return (
      <React.Fragment>
        {/* Header */}
        <div
          className="bg-dark p-2 d-flex justify-content-between align-items-center"
          style={{ height: "10vh" }}
        >
          <img src={icon76} alt="Company Logo"></img>
          <h2 className="text-light">Buchhaltung</h2>
          <Link
            to="/mainpage"
            className="btn text-light"
            style={{ borderLeft: "2px solid white" }}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </Link>
        </div>

        {/* Upper Side Menu */}
        <div className="d-flex flex-column align-items-start flex-lg-row justify-content-lg-start p-1 bg-secondary">
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("createSubscription")}
          >
            <FontAwesomeIcon icon={faCartPlus} size="lg" className="me-3" />
            <strong className="fs-6">Abo erstellen</strong>
          </button>
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("releaseSubscription")}
          >
            <FontAwesomeIcon icon={faCashRegister} size="lg" className="me-3" />
            <strong className="fs-6">Abo freigeben</strong>
          </button>
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("showArchive")}
          >
            <FontAwesomeIcon icon={faBookOpen} size="lg" className="me-3" />
            <strong className="fs-6">Buchungen</strong>
          </button>
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("createAccounting")}
          >
            <FontAwesomeIcon icon={faBookMedical} size="lg" className="me-3" />
            <strong className="fs-6">Neue Buchung</strong>
          </button>
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("createReceipt")}
          >
            <FontAwesomeIcon
              icon={faFileSignature}
              size="lg"
              className="me-3"
            />
            <strong className="fs-6">Quittung erstellen</strong>
          </button>
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("showReceipts")}
          >
            <FontAwesomeIcon icon={faFileInvoice} size="lg" className="me-3" />
            <strong className="fs-6">Quittungen</strong>
          </button>
          <button
            className="btn text-white my-1"
            onClick={this.renderMenu("editPricing")}
          >
            <FontAwesomeIcon icon={faDollarSign} size="lg" className="me-3" />
            <strong className="fs-6">Preise</strong>
          </button>
        </div>
        {/* Render Create Subscription Menu */}
        {this.state.showSubscriptionMenu ? (
          <CreateSubscription
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}
        {/* Render Release Subscription Menu */}
        {this.state.showReleaseMenu ? (
          <ReleaseSubscription
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}
        {/* Render Archive */}
        {this.state.showArchive ? (
          <AccountingArchive
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}
        {/* Render Create Accounting Menu */}
        {this.state.showCreateAccountingMenu ? (
          <CreateAccounting
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}
        {/* Render Create Receipt Menu */}
        {this.state.createReceiptMenu ? (
          <CreateReceipt
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}
        {/* Render Receipt Menu */}
        {this.state.showReceiptMenu ? (
          <Receipts username={this.state.username} userid={this.state.userid} />
        ) : null}
        {/* Render Edit Pricing Menu */}
        {this.state.showEditPricingMenu ? (
          <ChangePricing
            username={this.state.username}
            userid={this.state.userid}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Accounting;
