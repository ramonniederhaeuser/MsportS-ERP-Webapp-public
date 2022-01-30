import { Component } from "react";
import axios from "axios";
import baseURL from "../../utils/API";
import { toast } from "react-toastify";

class DoAuth extends Component {
  state = {};

  doAuth = async () => {
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
          baseURL + "/admin/admin-check.php",
          bodyParameters,
          config
        );
        if (response.data.success === 1) {
          this.setState({
            username: response.data.user.username,
            userid: response.data.user.id,
            isAuth: true,
            hasPermission: response.data.user.auth === "y" ? true : false,
          });
        } else {
          toast.info("Du wurdest abgemeldet");
          localStorage.removeItem("loginToken");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
}

export default DoAuth;
