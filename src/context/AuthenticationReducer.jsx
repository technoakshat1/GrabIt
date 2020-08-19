import {AUTHENTICATE_LOCAL,FETCH_USER_DATA,FETCH_AUTHENTICATION_STATUS} from "./action.types";
export default function AuthenticationReducer(state,action){
  switch(action.type){
      case AUTHENTICATE_LOCAL:
             return[...state,action.payload];
         break;
      case FETCH_USER_DATA:
          return[...state,{username:action.payload}];
          break;
  }
}

