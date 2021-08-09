import Api from '../../services/api-service';

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
  LIKES_SWITCH,
} from '../actions-constants';

const api = new Api();

const getArticlesAction = (payload) => ({ type: LOAD_ARTICLES, payload });

export const setCurrentPage = (currentPage) => ({ type: CURRENT_PAGE, currentPage });

const toggleIsFetching = (isFetching) => ({ type: FETCH_DATA, isFetching });

const setFetchError = (isFetchError) => ({ type: LOAD_ERROR, isFetchError });

const getOneArticleAction = (payload) => ({ type: LOAD_SINGLE_ARTICLE, payload });

const createArticleAction = () => (article) => ({ type: CREATE_ARTICLE, article });

const editArticleAction = () => (article) => ({ type: EDIT_ARTICLE, article });

const deleteArticleAction = () => (slug) => ({ type: DELETE_ARTICLE, slug });

const setFavoriteArticleAction = () => (slug) => ({ type: LIKE_FAVORITE_ARTICLE, slug });

const setUnFavoriteArticleAction = () => (slug) => ({ type: UNLIKE_FAVORITE_ARTICLE, slug });

const likesSwitchAction = (isLiked) => ({ type: LIKES_SWITCH, isLiked });

export const getArticles = (offset) => (dispatch) => {
  api
    .getArticlesList(offset)
    .then((json) => {
      dispatch(getArticlesAction(json));
      dispatch(toggleIsFetching(false));
    })
    .catch(() => {
      dispatch(setFetchError(true));
      dispatch(toggleIsFetching(false));
    });
};

export const getSingleArticle = (itemId) => (dispatch) => {
  api
    .getOneArticle(itemId)
    .then((json) => {
      dispatch(getOneArticleAction(json));
      dispatch(toggleIsFetching(false));
    })
    .catch(() => {
      dispatch(setFetchError(true));
      dispatch(toggleIsFetching(false));
    });
};

export const sendArticle = (article) => (dispatch) => {
  api.sendNewArticle(article).then((json) => {
    dispatch(createArticleAction(json));
  });
};

export const sendEditedArticle = (article, slug) => (dispatch) => {
  api.sendEditedArticle(article, slug).then((json) => {
    dispatch(editArticleAction(json));
  });
};

export const deleteArticle = (slug) => (dispatch) => {
  api.deleteArticle(slug).then((json) => {
    dispatch(deleteArticleAction(json));
  });
};

export const setFavoriteArticle = (slug) => (dispatch) => {
  api.setFavoriteArticle(slug).then((json) => {
    dispatch(setFavoriteArticleAction(json));
    dispatch(likesSwitchAction(true))
  });
};

export const setUnFavoriteArticle = (slug) => (dispatch) => {
  api.setUnFavoriteArticle(slug).then((json) => {
    dispatch(setUnFavoriteArticleAction(json));
    dispatch(likesSwitchAction(false))
  });
};
