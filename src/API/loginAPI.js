import qs from "qs";
import axios from "axios";


export async function fetchUserData(onSuccess) {
  try {
    const response = await axios({
      method: "get",
      withCredentials: true,
      crossdomain: true,
      url: "http://localhost:3001/userInfo",
    });
    if (response.data.message === "success") {
      onSuccess(response);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getTheme(successCallback) {
    try {
      const response = await axios({
        method: "get",
        withCredentials: true,
        crossdomain: true,
        url: "http://localhost:3001/userInfo",
      });
      console.log(response.data.mode);
      if (
        response.data.message === "success" &&
        response.data.mode !== undefined
      ) {
        successCallback(response.data.mode);
      }
    } catch (err) {
      console.log(err);
    }
  }


export async function isLoggedIn(authenticatedCallback,unAuthenticatedCallback){
    const response=await axios({
      method: 'get',
      withCredentials : true,
      crossdomain : true,
      url: 'http://localhost:3001/signIn',
    });

    console.log(response.data.mode);

    if(response.data.message==="Authenticated"){
      authenticatedCallback();
    }else{
      unAuthenticatedCallback();
    }
}


export async function authenticateLocal(username, password,loginSuccess,loginFailure) {
    try {
      
      const response = await axios({
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
        crossdomain: true,
        url: "http://localhost:3001/signIn",
        data: qs.stringify({
          username:username,
          password: password,
        }),
      });
      console.log(response);
      if (response.status === 200) {
        loginSuccess(response);
      }
    } catch (err) {
      if (err.response.status === 401) {
        loginFailure();
      }
      console.log(err.response);
    }
  }

  export async function logout(logoutSuccess) {
    try {
      const response = await axios({
        method: "get",
        withCredentials: true,
        crossdomain: true,
        url: "http://localhost:3001/signOut",
      });
      console.log(response);
      if (response.data.message === "success") {
        logoutSuccess();
      }
    } catch (err) {
      console.log(err);
    }
  }

  export async function saveMode(themeMode) {
    try {
      const response = await axios({
        method: "post",
        withCredentials: true,
        crossdomain: true,
        url: "http://localhost:3001/userInfo",
        data: qs.stringify({
          mode: themeMode,
        }),
      });
      if (response.data.message === "success") {
        alert("user theme preference saved");
      }
    } catch (err) {
      console.log(err);
    }
  }