import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const updateCustomerAccounting = async (data) => {
  if (data.updateCustomer_subscriptionType === "") {
    toast.error("Bitte zuerst Typ auswählen");
    return;
  } else {
    try {
      const response = await axios.post(
        baseURL + "/customer/customer-create-subscription.php",
        data
      );
      if (response.data.success === 1) {
        toast.success("Daten erfolgreich erfasst");
        const closeWindow = document.getElementById(data.editCustomerID);
        closeWindow.classList.remove("show");
      } else if (response.data.status === 404) {
        toast.error("Keine Verbindung zum Server!");
      } else {
        toast.error("Etwas ist schiefgelaufen!");
      }
    } catch (error) {
      console.log(error);
    }
  }
};
