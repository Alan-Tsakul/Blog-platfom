import { React } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const Header = () => {
  const cx = classNames.bind(styles);
  const LinkSignUp = cx(['header__link'], ['header__link-active']);
  const LinkSignIn = cx(['header__link']);

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.header__title}>Realworld Blog</div>
      </Link>
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
    </header>
  );
};

export default Header;
