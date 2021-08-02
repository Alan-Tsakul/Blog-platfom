import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/load-articles-action';
import TagsList from '../Tags-list/Tags-list';
import styles from './Comments-list.module.scss';

const CommentsList = ({ item, setFavoriteArticle, setUnFavoriteArticle }) => {
  const currentUser = JSON.parse(localStorage.getItem('User'));
  const history = useHistory();

  const articleTitle = (
    <Link to={`/article/${item.slug}`} className={styles.comment__title} title="Открыть статью">
      {item.title}
    </Link>
  );

  const buttonClass = styles.comment__button;

  const [isFavorite, setFavorite] = useState(false);

  const buttonClassFavorite = styles['comment__button-favorited'];

  function setFavoriteFunction() {
    if (!currentUser) {
      history.push('/sign-in');
    }
    setFavorite(!isFavorite);
    if (isFavorite) {
      setUnFavoriteArticle(item.slug);
    }
    setFavoriteArticle(item.slug);
  }

  const srcFav = '/images/path4.svg';
  const srcUnFav = '/images/Vector.svg';

  return (
    <div className={styles.comment__block}>
      <div className={styles['title-block']}>
        {articleTitle}
        <button type="button" className={isFavorite ? buttonClass : buttonClassFavorite} onClick={setFavoriteFunction}>
          <img src={isFavorite ? srcFav : srcUnFav} alt="like" />
        </button>
        <span className={styles['likes-counter']}>{isFavorite ? item.favoritesCount + 1 : item.favoritesCount}</span>
      </div>
      <div className={styles['tags-container']}>
        <TagsList item={item} />
      </div>
      <p className={styles.comment__text}>{item.description}</p>
    </div>
  );
};

CommentsList.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
  setFavoriteArticle: PropTypes.func.isRequired,
  setUnFavoriteArticle: PropTypes.func.isRequired,
};

export default connect(null, actions)(CommentsList);
