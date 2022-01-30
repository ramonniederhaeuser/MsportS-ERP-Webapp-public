import baseURL from "./../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const updatePricing = async (data) => {
  if (data.updatePricing_value === "") {
    toast.error("Bitte Preis eingeben");
    return;
  } else {
    try {
      const response = await axios.post(
        baseURL + "/accounting/pricing-update.php",
        data
      );
      if (response.data.success === 1) {
        toast.success("Daten erfolgreich erfasst");
        const closeWindow = document.getElementById(data.editPricingID);
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
