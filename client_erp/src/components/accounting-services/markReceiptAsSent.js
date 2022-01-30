import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const markReceiptAsSent = async (id, status) => {
  const newStatus = status === "y" ? "n" : "y";
  const receipt = { receiptid: id, sent: newStatus };
  try {
    const response = await axios.post(
      baseURL + "/accounting/receipt-update.php",
      receipt
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
