const userInfoState = {
  error: false
};

export default function userInfoReducer(state = userInfoState, action) {
  switch (action.type) {
    case 'Регистрация пользователя':
      return {
        ...state,
      };

    case 'Авторизация пользователя':
      return {
        ...state,
      };

    case 'Редактирование пользователя':
      return {
        ...state,
      };

    default:
      return state;
  }
}
