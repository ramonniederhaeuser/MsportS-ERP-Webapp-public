import baseURL from "./../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const createNewAccounting = async (data) => {
  if (
    data.newAccounting_bookingDate === "" ||
    data.newAccounting_bookingReason === "" ||
    data.newAccounting_amount === ""
  ) {
    toast.error("Bitte alle Felder ausfüllen");
    return;
  } else {
    try {
      const response = await axios.post(
        baseURL + "/accounting/accounting-create.php",
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
