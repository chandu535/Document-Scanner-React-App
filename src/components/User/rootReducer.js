import { combineReducers } from "redux";
import  userReducer from "./user/userReducer";

const rootReducers=combineReducers({
    user:userReducer

})
export default rootReducers