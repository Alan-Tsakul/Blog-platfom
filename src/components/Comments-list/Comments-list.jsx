import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/load-articles-action';
import TagsList from '../Tags-list/Tags-list';
import { useAuth } from '../../routers/use-auth';
import styles from './Comments-list.module.scss';

const CommentsList = ({ item, setFavoriteArticle, setUnFavoriteArticle, isLiked }) => {
  const history = useHistory();
  const auth = useAuth();
  const [state, setState] = useState(false)

  const favIcon = '/images/path4.svg';
  const unFavIcon = '/images/Vector.svg';

  function setFavorite() {
    if (!auth.isAuth) {
      history.push('/sign-in');
    } else {
      if (isLiked) {
        setUnFavoriteArticle(item.slug);
        setState(false)
      }
      if (!isLiked) {
        setFavoriteArticle(item.slug);
        setState(true)
      }
    }
  }

  return (
    <div className={styles.comment__block}>
      <div className={styles['title-block']}>
        <Link to={`/article/${item.slug}`} className={styles.comment__title} title="Открыть статью">
          {item.title}
        </Link>
        <button type="button" className={styles.comment__button} onClick={() => setFavorite()}>
          <img src={state === false ? unFavIcon : favIcon} alt="like" /> &nbsp;
          <span className={styles['likes-counter']}>{state === false ? item.favoritesCount : item.favoritesCount + 1}</span>
        </button>
      </div>
      <div className={styles['tags-container']}>
        <TagsList item={item} />
      </div>
      <p className={styles.comment__text}>{item.description}</p>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLiked: state.load.isLiked,
  };
}

CommentsList.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
  setFavoriteArticle: PropTypes.func.isRequired,
  setUnFavoriteArticle: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actions)(CommentsList);
