import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import HeaderAuth from '../components/Header-auth/Header-auth';
import EditProfileForm from '../components/Edit-profile-form/Edit-profile-form';
import CreateArticleForm from '../components/Create-article-form/Create-article-form';
import EditArticleForm from '../components/Edit-article-form/Edit-article-form';
import ArticlesList from '../components/Articles-list/Articles-list';
import SingleArticle from '../components/Single-article/Single-article';
import Header from '../components/Header/Header';
import SignUp from '../components/Sign-up-form/Sign-up-form';
import SignIn from '../components/Sign-in-form/Sign-in-form';

export default class RouteService {
  getHeaderAuth() {
    return <Route path="/" component={HeaderAuth} />;
  }

  getHeader() {
    return <Route path="/" component={Header} />;
  }

  getSignUp() {
    return <Route path="/sign-up" exact component={SignUp} />;
  }

  getSignIn() {
    return <Route path="/sign-in" exact component={SignIn} />;
  }

  getArticlesList() {
    return <Route path="/" exact component={ArticlesList} />;
  }

  getSingleArticle() {
    return (
      <Route
        path="/article/:id"
        render={({ match }) => {
          const { id } = match.params;
          return <SingleArticle itemId={id} />;
        }}
      />
    );
  }

  getEditProfileForm() {
    return <PrivateRoute path="/profile" exact component={EditProfileForm} />;
  }

  getCreateArticleForm() {
    return <PrivateRoute path="/new-article" exact component={CreateArticleForm} />;
  }

  getEditArticleForm(slug) {
    return <PrivateRoute path={`/articles/${slug}/edit`} component={EditArticleForm} />;
  }
}
