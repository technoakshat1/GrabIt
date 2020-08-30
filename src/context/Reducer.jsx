import {
  FETCH_USER_DATA,
  LOGOUT_CLEAR_USER_DATA,
} from "./action.types";
export default function Reducer(state, action) {
  switch (action.type) {
    case LOGOUT_CLEAR_USER_DATA:
      const clearedUserData = state.filter((state) => {
        return state.username !== action.payload;
      });
      return [...clearedUserData];
     
    case FETCH_USER_DATA:
      return [...state, { username: action.payload }];
  }
}