import baseURL from "./../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const deleteCustomer = async (id) => {
  const customerid = { customerid: id };
  try {
    const response = await axios.post(
      baseURL + "/customer/customer-delete.php",
      customerid
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
