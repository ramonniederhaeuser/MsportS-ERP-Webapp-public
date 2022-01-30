import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const createNewCustomer = async (data) => {
  if (
    data.newCustomer_firstname === "" ||
    data.newCustomer_lastname === "" ||
    data.newCustomer_adress === "" ||
    data.newCustomer_zip_city === "" ||
    data.newCustomer_birthdate === "" ||
    data.newCustomer_phone === "" ||
    data.newCustomer_mail === "" ||
    data.newCustomer_gender === ""
  ) {
    toast.error("Bitte alle Felder ausfüllen");
    return;
  } else {
    try {
      const response = await axios.post(
        baseURL + "/customer/customer-create.php",
        data
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
};
