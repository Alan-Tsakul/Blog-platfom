import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import * as actions from '../../actions/load-articles-action';
import Article from '../Article/Article';
import styles from './Many-articles-list.module.scss';

const ManyArticlesList = ({ currentPage, setCurrentPage, getArticles, loadedArticles }) => {
  function onPageChange(event) {
    const offset = event * 5;
    getArticles(offset);
    setCurrentPage(event);
  }

  const elements = loadedArticles.map((item) => <Article item={item} key={uuidv4()} />);
  return (
    <>
      <div className={styles['articles-list']}>{elements}</div>
      <Pagination defaultCurrent={currentPage} total={500} size="small" onChange={(event) => onPageChange(event)} />
    </>
  );
};

function mapStateToProps(state) {
  return {
    loadedArticles: state.load.articles,
    currentPage: state.load.currentPage,
    oneArticle: state.load.oneArticle,
  };
}

ManyArticlesList.propTypes = {
  loadedArticles: PropTypes.instanceOf(Array).isRequired,
  getArticles: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(ManyArticlesList);
