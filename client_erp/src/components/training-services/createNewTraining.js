import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const createNewTraining = async (data) => {
  if (
    data.newTraining_tags === "" ||
    data.newTraining_date === "" ||
    data.newTraining_time === "" ||
    data.newTraining_loginExpireDate === "" ||
    data.newTraining_loginExpireTime === "" ||
    data.newTraining_maxMember === ""
  ) {
    toast.error("Bitte alle Felder ausfüllen");
    return;
  } else {
    try {
      const response = await axios.post(
        baseURL + "/training/training-create.php",
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
