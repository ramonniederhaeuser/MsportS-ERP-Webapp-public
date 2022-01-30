import axios from "axios";
import { toast } from "react-toastify";
import baseURL from "./../../utils/API";

export const submitNewPassword = async (state) => {
  if (state.newPassword.length < 5) {
    toast.error("Bitte mindestens 5 Zeichen einsetzen");
    return;
  } else {
    try {
      const response = await axios.post(
        baseURL + "/admin/admin-update.php",
        state
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
