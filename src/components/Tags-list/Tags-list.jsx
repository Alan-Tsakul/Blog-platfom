import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tags-list.module.scss';

const TagsList = ({ item, index }) => {
  const tagsList = item.tagList.map((elem) => (
    <li className={styles['comment-tags__item']} key={index}>
      {elem}
    </li>
  ));
  return <ul className={styles['comment-tags']}>{tagsList}</ul>;
};

TagsList.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired
};

export default TagsList;
