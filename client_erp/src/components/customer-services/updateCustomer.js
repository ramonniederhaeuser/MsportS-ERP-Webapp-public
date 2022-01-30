import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const updateCustomer = async (data) => {
  if (
    data.updateCustomer_firstname === "" ||
    data.updateCustomer_lastname === "" ||
    data.updateCustomer_adress === "" ||
    data.updateCustomer_zip_city === "" ||
    data.updateCustomer_birthdate === "" ||
    data.updateCustomer_phone === "" ||
    data.updateCustomer_mail === "" ||
    data.updateCustomer_gender === ""
  ) {
    toast.error("Bitte alle Felder ausfüllen");
    return;
  } else {
    try {
      const response = await axios.post(
        baseURL + "/customer/customer-update.php",
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
