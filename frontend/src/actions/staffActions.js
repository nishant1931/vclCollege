import axios from "axios";
import {
  STAFF_LOGIN_FAIL,
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGOUT,
} from "../constants/staffConstants";

export const loginStaff = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: STAFF_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/staff/login",
      { email, password },
      config
    );

    dispatch({ type: STAFF_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("staffInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STAFF_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const staffLogout = () => (dispatch) => {
  localStorage.removeItem("staffInfo");
  dispatch({ type: STAFF_LOGOUT });
  // dispatch({ type: USER_DETAILS_RESET });
  // dispatch({ type: ORDER_LIST_MY_RESET });
};
