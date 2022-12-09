import axios from "axios";
import {
  STUDENT_LISTS_FAIL,
  STUDENT_LISTS_REQUEST,
  STUDENT_LISTS_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGOUT,
  STUDENT_REGISTER_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_UPDATE_FAIL,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
} from "../constants/studentConstants";

export const loginStudent = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/student/login",
      { email, password },
      config
    );

    dispatch({ type: STUDENT_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("studentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STUDENT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const studentLogout = () => (dispatch) => {
  localStorage.removeItem("studentInfo");
  dispatch({ type: STUDENT_LOGOUT });
  // dispatch({ type: USER_DETAILS_RESET });
};

export const registerStudent = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/student/register",
      { name, email, password },
      config
    );

    dispatch({ type: STUDENT_REGISTER_SUCCESS, payload: data });
    dispatch({ type: STUDENT_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("studentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STUDENT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listStudents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_LISTS_REQUEST });

    const {
      staffLogin: { staffInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${staffInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/student/allstudents`, config);

    dispatch({ type: STUDENT_LISTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_LISTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStudent = (student) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_UPDATE_REQUEST });

    const {
      studentLogin: { studentInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${studentInfo.token}`,
      },
    };

    await axios.patch(`/api/student/${student._id}`, student, config);

    dispatch({ type: STUDENT_UPDATE_SUCCESS });
    // dispatch({ type: STUDENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
