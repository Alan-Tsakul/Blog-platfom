import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/user-info-action';
import styles from './App.module.scss';
import { ProvideAuth } from '../../routers/use-auth';
import RouteService from '../../routers/route-service';

const App = ({ userLSDataAction, currentuser, oneArticle }) => {
  useEffect(() => {
    userLSDataAction();
  }, []); //eslint-disable-line

  const route = new RouteService();
  const SignIn = route.getSignIn();
  const SignUp = route.getSignUp();
  const ArticlesList = route.getArticlesList();
  const SingleArticle = route.getSingleArticle();
  const EditProfileForm = route.getEditProfileForm();
  const CreateArticleForm = route.getCreateArticleForm();
  const EditArticleForm = route.getEditArticleForm(oneArticle.slug);
  const HeaderAuth = route.getHeaderAuth();
  const Header = route.getHeader();

  return (
    <ProvideAuth>
      <Router>
        <div className={styles.app}>
          <div className={styles.app__container}>
            {currentuser ? HeaderAuth : Header}
            {SignUp}
            {SignIn}
            {ArticlesList}
            {SingleArticle}
            {EditProfileForm}
            {CreateArticleForm}
            {EditArticleForm}
          </div>
        </div>
      </Router>
    </ProvideAuth>
  );
};

function mapStateToProps(state) {
  return {
    currentuser: state.user.currentuser,
    oneArticle: state.load.oneArticle,
  };
}

App.propTypes = {
  currentuser: PropTypes.objectOf(PropTypes.object).isRequired,
  userLSDataAction: PropTypes.func.isRequired,
  oneArticle: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, actions)(App);
