const loadArticlesState = {
  articles: [],
  oneArticle: {},
  currentPage: 1,
  isFetching: true,
  isFetchError: false,
};

export default function loadArticlesReducer(state = loadArticlesState, action) {
  switch (action.type) {
    case 'Загрузить статьи':
      return {
        ...state,
        articles: action.payload.articles,
      };

    case 'Загрузка данных':
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case 'Ошибка загрузки':
      return {
        ...state,
        isFetchError: action.isFetchError,
      };

    case 'Текущая страница':
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case 'Загрузить одну статью':
      return {
        ...state,
        oneArticle: action.payload.article,
      };

    case 'Создать статью':
      return {
        ...state,
      };

    case 'Редактировать статью':
      return {
        ...state,
      };

    case 'Удалить статью':
      return {
        ...state,
      };

    case 'Отметить любимую статью':
      return {
        ...state,
      };

    case 'Удалить любимую статью':
      return {
        ...state,
      };

    default:
      return state;
  }
}
