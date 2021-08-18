import { combineReducers } from "redux";

import IsLoggedReducer from "./log/reducers/IsloggedReducer";

const AllReducers = combineReducers({
  IsLoggedReducer,
});

export default AllReducers;
