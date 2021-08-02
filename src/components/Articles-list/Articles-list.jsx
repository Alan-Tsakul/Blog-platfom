import { React, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Spin, Alert, Result } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/load-articles-action';
import ManyArticlesList from '../Many-articles-list/Many-articles-list';
import SingleArticle from '../Single-article/Single-article'
import 'antd/dist/antd.css';

const ArticlesList = ({ getArticles, isFetching, isFetchError }) => {
  useEffect(() => {
    getArticles();
  }, []); //eslint-disable-line

  const spinner = isFetching ? (
    <Spin tip="Loading...">
      <Alert />
    </Spin>
  ) : null;

  const error = isFetchError ? <Result subTitle="Sorry, something went wrong." /> : null;

  return (
    <>
      {spinner}
      {error}
      <Route path="/" exact component={ManyArticlesList} />
      <Route path="/auth" exact component={ManyArticlesList} />
      <Route
        path="/article/:id"
        render={({ match }) => {
          const { id } = match.params;
          return <SingleArticle itemId={id} />;
        }}
      />
    </>
  );
};

function mapStateToProps(state) {
  return {
    isFetching: state.load.isFetching,
    isFetchError: state.load.isFetchError,
  };
}

ArticlesList.propTypes = {
  getArticles: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchError: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actions)(ArticlesList);
