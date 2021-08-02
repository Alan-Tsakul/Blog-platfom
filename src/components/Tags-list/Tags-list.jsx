import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './Tags-list.module.scss';

const TagsList = ({ item }) => {
  const tagsList = item.tagList.map((elem) => <li className={styles['comment-tags__item']} key={uuidv4()}>{elem}</li>);
  return <ul className={styles['comment-tags']}>{tagsList}</ul>;
};

TagsList.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default TagsList;
