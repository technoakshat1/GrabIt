//jshint esversion:6
import {
  FETCH_USER_DATA,
  LOGOUT_CLEAR_USER_DATA,
  THEME_MODE_SAVED
} from "./action.types";
export default function Reducer(state, action) {
  switch (action.type) {
    case LOGOUT_CLEAR_USER_DATA:
      const clearedUserData = state.filter((state) => {
        return state.username !== action.payload;
      });
      return [...clearedUserData];
     
    case FETCH_USER_DATA:
      // console.log(action.payload)
      return [...state, { username: action.payload.username ,email: action.payload.email,profileImage: action.payload.profileImg}];
  }
}

export const ThemeReducer=(state,action)=>{
  switch(action.type){
    case THEME_MODE_SAVED:
      return action.payload;
  }
}
