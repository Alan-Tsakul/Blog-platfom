import { React, useEffect } from 'react';
import { Spin, Alert, Result, Pagination } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/load-articles-action';
import Article from '../Article/Article';
import 'antd/dist/antd.css';
import styles from './Articles-list.module.scss';

const ArticlesList = ({ currentPage, setCurrentPage, getArticles, loadedArticles, isFetching, isFetchError }) => {
  useEffect(() => {
    getArticles();
  }, []); //eslint-disable-line

  function onPageChange(event) {
    const ARTICLES_PER_PAGE = event * 5;
    getArticles(ARTICLES_PER_PAGE);
    setCurrentPage(event);
  }

  const elements = loadedArticles.map((item) => <Article item={item} key={item.slug} />);

  const spinner = isFetching ? (
    <Spin tip="Loading...">
      <Alert />
    </Spin>
  ) : null;

  const error = isFetchError ? <Result subTitle="Sorry, something went wrong." /> : null;

  const pagination = (
    <Pagination defaultCurrent={currentPage} total={500} size="small" onChange={(event) => onPageChange(event)} />
  );

  return (
    <>
      {spinner}
      {error}
      <div className={styles['articles-list']}>{elements}</div>
      {pagination}
    </>
  );
};

function mapStateToProps(state) {
  return {
    loadedArticles: state.load.articles,
    currentPage: state.load.currentPage,
    oneArticle: state.load.oneArticle,
    isFetchError: state.load.isFetchError,
    isFetching: state.load.isFetching
  };
}

ArticlesList.propTypes = {
  loadedArticles: PropTypes.instanceOf(Array).isRequired,
  getArticles: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchError: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actions)(ArticlesList);
