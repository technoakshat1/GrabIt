import qs from "qs";
import axios from "axios";

export async function signUp(email,username,password,onSignUpSuccess) {
   try{
       const response = await axios({
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
        crossdomain: true,
        url: "http://localhost:3001/signUp",
        data: qs.stringify({
          email:email,
          username: username,
          password: password,
        }),
       });
      
       if(response.data.message==="success"){
           onSignUpSuccess();
       }

   }catch(err){
       alert("Currently our servers are down please try again later!!");
   }
}