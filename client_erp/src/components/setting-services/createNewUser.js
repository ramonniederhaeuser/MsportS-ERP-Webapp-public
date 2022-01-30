import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const createNewUser = async (state) => {
  if (state.newUser_username.length < 3) {
    toast.error("Benutzername muss mindestens 3 Zeichen enthalten");
    return;
  } else if (state.newUser_password.length < 5) {
    toast.error("Passwort muss mindestens 5 Zeichen enthalten");
    return;
  } else {
    try {
      const response = await axios.post(
        baseURL + "/admin/admin-create.php",
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
