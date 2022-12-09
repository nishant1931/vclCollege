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
  STUDENT_UPDATE_RESET,
  STUDENT_UPDATE_SUCCESS,
} from "../constants/studentConstants";

export const studentLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_LOGIN_REQUEST:
      return { loading: true };
    case STUDENT_LOGIN_SUCCESS:
      return { loading: false, studentInfo: action.payload };
    case STUDENT_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const studentRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_REGISTER_REQUEST:
      return { loading: true };
    case STUDENT_REGISTER_SUCCESS:
      return { loading: false, studentInfo: action.payload };
    case STUDENT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentListsReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_LISTS_REQUEST:
      return { loading: true };
    case STUDENT_LISTS_SUCCESS:
      return { loading: false, students: action.payload };
    case STUDENT_LISTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentUpdateReducer = (state = { student: {} }, action) => {
  switch (action.type) {
    case STUDENT_UPDATE_REQUEST:
      return { loading: true };
    case STUDENT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case STUDENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_UPDATE_RESET:
      return { student: {} };
    default:
      return state;
  }
};
