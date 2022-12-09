import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  studentListsReducer,
  studentLoginReducer,
  studentRegisterReducer,
  studentUpdateReducer,
} from "./reducers/studentReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { staffLoginReducer } from "./reducers/staffReducer";

const reducer = combineReducers({
  studentLogin: studentLoginReducer,
  studentRegister: studentRegisterReducer,
  studentLists: studentListsReducer,
  studentUpdate: studentUpdateReducer,
  staffLogin: staffLoginReducer,
});

const studentInfoFromStorage = localStorage.getItem("studentInfo")
  ? JSON.parse(localStorage.getItem("studentInfo"))
  : null;

const staffInfoFromStorage = localStorage.getItem("staffInfo")
  ? JSON.parse(localStorage.getItem("staffInfo"))
  : null;

const initialState = {
  studentLogin: {
    studentInfo: studentInfoFromStorage,
  },
  staffLogin: {
    staffInfo: staffInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
