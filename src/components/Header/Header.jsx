import { React } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import * as actions from '../../actions/user-info-action';
import styles from './Header.module.scss';

const Header = () => {
  const cx = classNames.bind(styles);
  const LinkSignUp = cx(['header__link'], ['header__link-active']);
  const LinkSignIn = cx(['header__link']);
  const LinkCreateArticle = cx(['header__link'], ['header__link-active'], ['header__link-active-green']);
  const LinkLogOut = cx(['header__link'], ['header__link-active'], ['header__link-active-black']);

  const currentUser = JSON.parse(localStorage.getItem('User'));
  const user = '';
  const image = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  function onLogOut() {
    localStorage.removeItem('User');
    localStorage.removeItem('Token');
  }

  const HeaderNotAuth = () => (
    <ul className={styles['header-links']}>
      <li className={LinkSignIn} title="Авторизация">
        <Link className={styles.blackText} to="/sign-in">
          Sign In
        </Link>
      </li>
      <li className={LinkSignUp} title="Регистрация">
        <Link className={styles.greenText} to="/sign-up">
          Sign Up
        </Link>
      </li>
    </ul>
  );

  const HeaderAuth = () => (
    <ul className={styles['header-links']}>
      <li className={LinkCreateArticle} title="Создать статью">
        <Link className={styles.greenText} to="/new-article">
          Create Article
        </Link>
      </li>
      <li className={LinkSignIn}>
        <Link className={styles.blackText} to="/profile" title="Редактировать профиль">
          {currentUser ? currentUser.username : user} &nbsp;
          <img src={currentUser ? currentUser.image : image} className={styles.header__image} alt="user" />
        </Link>
      </li>
      <li className={LinkLogOut} title="Выйти из профиля">
        <Link className={styles.blackText} to="/">
          <button className={styles.header__onLogOutBtn} type="button" onClick={onLogOut}>
            Log Out
          </button>
        </Link>
      </li>
    </ul>
  );

  let HeaderInfo;

  if (currentUser) {
    HeaderInfo = HeaderAuth;
  } else {
    HeaderInfo = HeaderNotAuth;
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__title}>Realworld Blog</div>
      <Route path="/" exact component={HeaderInfo} />
    </header>
  );
};

export default connect(null, actions)(Header);
