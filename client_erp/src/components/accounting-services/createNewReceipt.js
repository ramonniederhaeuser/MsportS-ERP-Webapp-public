import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const createNewReceipt = async (data) => {
  if (
    data.newReceipt_firstname === "" ||
    data.newReceipt_lastname === "" ||
    data.newReceipt_adress === "" ||
    data.newReceipt_zip_city === "" ||
    data.newReceipt_phone === "" ||
    data.newReceipt_mail === "" ||
    data.newReceipt_productType === "" ||
    data.newReceipt_amount === ""
  ) {
    toast.error("Bitte alle Felder ausfüllen");
    return;
  } else {
    try {
      const response = await axios.post(
        baseURL + "/accounting/receipt-create.php",
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
