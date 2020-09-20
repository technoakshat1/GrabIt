import axios from "axios";
import qs from "qs";

export async function fetchProfileInfo(onSuccess,onFailure){
    try {
        const response = await axios({
          method: "get",
          withCredentials: true,
          crossdomain: true,
          url: "http://localhost:3001/userInfo/profile",
        });
        if (response.status===200) {
          onSuccess(response.data);
        }
      } catch (err) {
        console.log(err);
        onFailure();
      }
}

export async function editProfileInfo(data,onSuccess,onFailure){
    try {
        const response = await axios({
          method: "post",
          withCredentials: true,
          crossdomain: true,
          url: "http://localhost:3001/userInfo/profile",
          data:qs.stringify(data),
        });
        if (response.status===200) {
          onSuccess();
        }
      } catch (err) {
        console.log(err);
        onFailure();
      }
}
