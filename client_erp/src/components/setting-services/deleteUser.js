import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const deleteUser = async (id) => {
  const userid = { userid: id };
  try {
    const response = await axios.post(
      baseURL + "/admin/admin-delete.php",
      userid
    );
    if (response.data.success === 1) {
      toast.success("Erfolgreich entfernt");
    } else if (response.data.status === 404) {
      toast.error("Keine Verbindung zum Server!");
    } else {
      toast.error("Etwas ist schiefgelaufen!");
    }
  } catch (error) {
    console.log(error);
  }
};
