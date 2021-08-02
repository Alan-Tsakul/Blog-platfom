import { React } from 'react';
import PropTypes from 'prop-types';
import CommentsList from '../Comments-list/Comments-list';
import UsersList from '../Users-list/Users-list';
import styles from './Article.module.scss';

const Article = ({ item, buttons }) => (
  <div className={styles.article}>
    <CommentsList item={item} buttons={buttons}/>
    <UsersList item={item} buttons={buttons} />
  </div>
);

Article.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
  buttons: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Article;
