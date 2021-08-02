import Api from '../services/api-service';

const api = new Api();

const getArticlesAction = (payload) => ({ type: 'Загрузить статьи', payload });

export const setCurrentPage = (currentPage) => ({ type: 'Текущая страница', currentPage });

const toggleIsFetching = (isFetching) => ({ type: 'Загрузка данных', isFetching });

const setFetchError = (isFetchError) => ({ type: 'Ошибка загрузки', isFetchError });

const getOneArticleAction = (payload) => ({ type: 'Загрузить одну статью', payload });

const createArticleAction = () => (article) => ({ type: 'Создать статью', article });

const editArticleAction = () => (article) => ({ type: 'Редактировать статью', article });

const deleteArticleAction = () => (slug) => ({ type: 'Удалить статью', slug });

const setFavoriteArticleAction = () => (slug) => ({ type: 'Отметить любимую статью', slug });

const setUnFavoriteArticleAction = () => (slug) => ({ type: 'Удалить любимую статью', slug });

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
  });
};

export const setUnFavoriteArticle = (slug) => (dispatch) => {
  api.setUnFavoriteArticle(slug).then((json) => {
    dispatch(setUnFavoriteArticleAction(json));
  });
};
