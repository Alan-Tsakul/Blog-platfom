import {
  LOAD_ARTICLES,
  FETCH_DATA,
  LOAD_ERROR,
  CURRENT_PAGE,
  LOAD_SINGLE_ARTICLE,
  CREATE_ARTICLE,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
  LIKE_FAVORITE_ARTICLE,
  UNLIKE_FAVORITE_ARTICLE,
  LIKES_SWITCH
} from '../actions-constants';

const loadArticlesState = {
  articles: [],
  oneArticle: {},
  currentPage: 1,
  isFetching: true,
  isFetchError: false,
  isLiked: false,
};

export default function loadArticlesReducer(state = loadArticlesState, action) {
  switch (action.type) {
    case LOAD_ARTICLES:
      return {
        ...state,
        articles: action.payload.articles,
      };

    case FETCH_DATA:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case LOAD_ERROR:
      return {
        ...state,
        isFetchError: action.isFetchError,
      };

    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case LOAD_SINGLE_ARTICLE:
      return {
        ...state,
        oneArticle: action.payload.article,
      };

    case CREATE_ARTICLE:
      return {
        ...state,
      };

    case EDIT_ARTICLE:
      return {
        ...state,
      };

    case DELETE_ARTICLE:
      return {
        ...state,
      };

    case LIKE_FAVORITE_ARTICLE:
      return {
        ...state,
      };

    case UNLIKE_FAVORITE_ARTICLE:
      return {
        ...state,
      };

    case LIKES_SWITCH:
      return {
        ...state,
        isLiked: action.isLiked,
      };

    default:
      return state;
  }
}
