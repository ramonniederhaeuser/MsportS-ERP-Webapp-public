import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const deleteTraining = async (id) => {
  const trainingid = { trainingid: id };
  try {
    const response = await axios.post(
      baseURL + "/training/training-delete.php",
      trainingid
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
