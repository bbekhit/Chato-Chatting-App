import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import postReducer from "./postReducer";
import filtersReducer from "./filtersReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  post: postReducer,
  filters: filtersReducer
});
