import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './App.module.scss';
import Header from '../Header/Header';
import ArticlesList from '../Articles-list/Articles-list';
import SignUp from '../Sign-up-form/Sign-up-form';
import SignIn from '../Sign-in-form/Sign-in-form';
import EditProfileForm from '../Edit-profile-form/Edit-profile-form';
import CreateArticleForm from '../Create-article-form/Create-article-form';
import EditArticleForm from '../Edit-article-form/Edit-article-form';

const App = ({ oneArticle }) => (
  <Router>
    <div className={styles.app}>
      <div className={styles.app__container}>
        <Header />
        <ArticlesList />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/profile" exact component={EditProfileForm} />
        <Route path="/new-article" exact component={CreateArticleForm} />
        <Route path={`/articles/${oneArticle.slug}/edit`} exact component={EditArticleForm} />
      </div>
    </div>
  </Router>
);

function mapStateToProps(state) {
  return {
    oneArticle: state.load.oneArticle,
  };
}

App.propTypes = {
  oneArticle: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(App);
