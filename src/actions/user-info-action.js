import Api from '../services/api-service';

const api = new Api();

const userRegistrationAction = () => (user) => ({ type: 'Регистрация пользователя', user });

const userAuthenticationAction = () => (user) => ({ type: 'Авторизация пользователя', user });

const editUserAction = () => (user) => ({ type: 'Редактирование пользователя', user });

export const putUserRegistration = (username, email, password) => (dispatch) => {
  api.registrationOfUser(username, email, password).then((json) => {
    dispatch(userRegistrationAction(json));
  });
};

export const putUserAuthentication = (email, password) => (dispatch) => {
  api.authenticationOfUser(email, password).then((json) => {
    dispatch(userAuthenticationAction(json));
  });
};

export const editUserAuthorized = (userData) => (dispatch) => {
  api.editUser(userData).then((json) => {
    dispatch(editUserAction(json));
  });
};
