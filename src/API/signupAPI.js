import qs from "qs";
import axios from "axios";

export async function signUp(email, username, password, onSignUpSuccess) {
  try {
    const response = await axios({
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
      crossdomain: true,
      url: "http://localhost:3001/signUp",
      data: qs.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });

    if (response.data.message === "success") {
      onSignUpSuccess();
    }
  } catch (err) {
    alert("Currently our servers are down please try again later!!");
  }
}

export async function isAccountPendingForVerification(username,onStatus){
  try {
    const response = await axios({
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
      crossdomain: true,
      url: `http://localhost:3001/signUp/isPendingForVerification/${username}`,
    });

    if (response.data.message === "success") {
      onStatus(true);
    }
 }catch(err){
      onStatus(false);
 }

}

export async function accountVerification(data, onVerificationSuccess) {
  try {
    const response = await axios({
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
      crossdomain: true,
      url: "http://localhost:3001/signUp/account-verification",
      data: qs.stringify({
        username: data.username,
        firstName: data.firstName,
        surname: data.surname,
        email: data.email,
        address: data.address,
        postalCode: data.postalCode,
        city: data.city,
        state: data.state,
        country: data.country,
      }),
    });
    if (response.data.message === "success") {
      onVerificationSuccess();
    }
  } catch (err) {
    alert("Currently our servers are down please try again later!!");
  }
}
