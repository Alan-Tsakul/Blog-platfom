import {
  USER_REGISTRATION,
  USER_AUTHENTICATION,
  EDIT_USER_DATA,
  GET_USER_DATA,
  GET_LS_DATA,
  DELETE_LS_DATA,
  CHECK_REGISTRATION
} from '../actions-constants';

const userInfoState = {
  currentuser: {},
  isRegistered: false,
};

export default function userInfoReducer(state = userInfoState, action) {
  switch (action.type) {
    case USER_REGISTRATION:
      return {
        ...state,
      };

    case CHECK_REGISTRATION:
      return {
        ...state,
        isRegistered: action.isRegistered
      };

    case USER_AUTHENTICATION:
      return {
        ...state,
      };

    case EDIT_USER_DATA:
      return {
        ...state,
      };

    case GET_USER_DATA:
      return {
        ...state,
        currentuser: action.payload.user,
      };

    case GET_LS_DATA:
      return {
        ...state,
        currentuser: action.user,
      };

    case DELETE_LS_DATA:
      return {
        ...state,
        currentuser: action.noUser,
      };

    default:
      return state;
  }
}
