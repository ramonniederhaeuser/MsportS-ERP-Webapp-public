import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const authUser = async (id, authorization) => {
  const auth = authorization === "y" ? "n" : "y";
  const user = { userid: id, auth: auth };
  try {
    const response = await axios.post(
      baseURL + "/admin/admin-update.php",
      user
    );
    if (response.data.success === 1) {
    } else if (response.data.status === 404) {
      toast.error("Keine Verbindung zum Server!");
    } else {
      toast.error("Etwas ist schiefgelaufen!");
    }
  } catch (error) {
    console.log(error);
  }
};
