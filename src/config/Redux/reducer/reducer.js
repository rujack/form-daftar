import { combineReducers } from "redux";
import createFormReducer from "./createForm";
import homeReducer from "./homeReducer";
import requestReducer from "./requestReducer"
import userReducer from "./userReducer";

const reducer = combineReducers({
  createFormReducer,homeReducer,requestReducer,userReducer
});

export default reducer;