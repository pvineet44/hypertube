import userReducer from "./user";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["loggedInUser"],
};

const rootReducer = combineReducers({
  loggedInUser: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
