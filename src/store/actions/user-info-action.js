import { notification } from 'antd';
import Api from '../../services/api-service';
import {
  USER_REGISTRATION,
  USER_AUTHENTICATION,
  EDIT_USER_DATA,
  GET_USER_DATA,
  GET_LS_DATA,
  DELETE_LS_DATA,
  CHECK_REGISTRATION,
} from '../actions-constants';

const api = new Api();

const userRegistrationAction = () => (user) => ({ type: USER_REGISTRATION, user });

const checkRegistrationAction = (isRegistered) => ({ type: CHECK_REGISTRATION, isRegistered });

const userAuthenticationAction = () => (user) => ({ type: USER_AUTHENTICATION, user });

const userGetDataAction = (payload) => ({ type: GET_USER_DATA, payload });

export const userLSDataAction = () => ({ type: GET_LS_DATA, user: JSON.parse(localStorage.getItem('User')) });

export const logoutAction = () => ({ type: DELETE_LS_DATA, user: localStorage.clear() });

const editUserAction = () => (user) => ({ type: EDIT_USER_DATA, user });

const openNotification = () => {
  notification.open({
    message: 'Warning!',
    description: 'Please, check your data!',
  });
};

export const putUserRegistration = (username, email, password) => (dispatch) => {
  api
    .registrationOfUser(username, email, password)
    .then((json) => {
      dispatch(userRegistrationAction(json));
      dispatch(checkRegistrationAction(true));
    })
    .catch(() => openNotification());
};

export const putUserAuthentication = (email, password) => (dispatch) => {
  api
    .authenticationOfUser(email, password)
    .then((json) => {
      dispatch(userAuthenticationAction(json));
      dispatch(userGetDataAction(json));
      dispatch(checkRegistrationAction(false));
    })
    .catch(() => openNotification());
};

export const editUserAuthorized = (userData) => (dispatch) => {
  api
    .editUser(userData)
    .then((json) => {
      dispatch(editUserAction(json));
    })
    .catch(() => openNotification());
};
