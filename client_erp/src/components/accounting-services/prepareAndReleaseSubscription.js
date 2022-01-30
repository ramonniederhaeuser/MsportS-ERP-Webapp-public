import axios from "axios";
import baseURL from "./../../utils/API";
import { toast } from "react-toastify";

export const prepareAndReleaseSubscription = async (id, state) => {
  //iterate through customers and get data
  const customers = state.customers;
  for (let customer of customers) {
    if (customer.id === id) {
      const subscriptionType = customer.subscriptionType;
      function getExpiringDate() {
        if (subscriptionType === "10er Abo") {
          const date = new Date();
          date.setMonth(date.getMonth() + 12);
          return date;
        }
        if (subscriptionType === "1 Monat") {
          const date = new Date();
          date.setMonth(date.getMonth() + 1);
          return date;
        }
        if (subscriptionType === "6 Monate") {
          const date = new Date();
          date.setMonth(date.getMonth() + 6);
          return date;
        }
        if (subscriptionType === "12 Monate") {
          const date = new Date();
          date.setMonth(date.getMonth() + 12);
          return date;
        }
        if (subscriptionType === "5 Monate") {
          const date = new Date();
          date.setMonth(date.getMonth() + 5);
          return date;
        }
        if (subscriptionType === "12 Monate spez") {
          const date = new Date();
          date.setMonth(date.getMonth() + 12);
          return date;
        }
      }
      function getSubscriptionQuantity() {
        if (subscriptionType === "10er Abo") {
          return 10;
        } else {
          return 0;
        }
      }
      //set correct state and prepare for send
      const newState = {
        editCustomerID: id,
        customer_firstname: customer.firstname,
        customer_lastname: customer.lastname,
        customer_adress: customer.adress,
        customer_zip_city: customer.zip_city,
        customer_mail: customer.mail,
        customer_phone: customer.phone,
        updateCustomer_subscriptionUntil: getExpiringDate()
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, `-`),
        updateCustomer_subscriptionQuantity: getSubscriptionQuantity(),
        updateCustomer_subscriptionReason:
          "Abo Verkauf: " +
          customer.firstname +
          " " +
          customer.lastname +
          ", " +
          "Abotyp: " +
          customer.subscriptionType,
        updateCustomer_subscriptionType: customer.subscriptionType,
        updateCustomer_updatedBy: state.updateCustomer_updatedBy,
      };
      try {
        const response = await axios.post(
          baseURL + "/customer/customer-release-subscription.php",
          newState
        );
        if (response.data.success === 1) {
          toast.success("Daten erfolgreich erfasst");
        } else if (response.data.status === 404) {
          toast.error("Keine Verbindung zum Server!");
        } else {
          toast.error("Etwas ist schiefgelaufen!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
