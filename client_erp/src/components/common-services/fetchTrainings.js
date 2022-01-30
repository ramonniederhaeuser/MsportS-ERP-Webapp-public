import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchTrainings = async () => {
  const loginToken = localStorage.getItem("loginToken");
  const config = {
    headers: { Authorization: `Bearer ` + loginToken },
  };
  const bodyParameters = {
    key: "value",
  };
  if (loginToken) {
    try {
      const response = await axios.post(
        baseURL + "/training/training-fetch.php",
        bodyParameters,
        config
      );
      if (response.data.success === 1) {
        return response.data.trainings;
      } else {
        toast.error("Keine Daten");
        return [];
      }
    } catch (error) {
      toast.error("Etwas ist schiefgelaufen");
      console.log(error);
    }
  }
};
