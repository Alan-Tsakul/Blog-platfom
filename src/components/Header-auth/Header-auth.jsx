import { React } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/user-info-action';
import styles from './Header-auth.module.scss';

const HeaderAuth = ({ currentuser, logoutAction }) => {
  const history = useHistory();
  function onLogOut() {
    logoutAction();
    history.push('/');
  }

  const stub = '/images/user.svg';

  const picture = currentuser.image === null ? stub : currentuser.image

  return (
    <header className={styles['header-auth']}>
      <Link to="/">
        <div className={styles['header-auth__title']}>Realworld Blog</div>
      </Link>
      <ul className={styles['header-auth__links']}>
        <li className={styles['header-auth__new-article']} title="Создать статью">
          <Link className={styles['header-auth__green-text']} to="/new-article">
            Create Article
          </Link>
        </li>
        <li className={styles['header-auth__edit-profile']}>
          <Link className={styles['header-auth__black-text']} to="/profile" title="Редактировать профиль">
            {currentuser.username} &nbsp;
            <img src={picture} className={styles['header-auth__image']} alt="userimage" />
          </Link>
        </li>
        <li className={styles['header-auth__log-out']} title="Выйти из профиля">
          <Link className={styles['header-auth__black-text']} to="/">
            <button className={styles['header-auth__log-out-btn']} type="button" onClick={onLogOut}>
              Log Out
            </button>
          </Link>
        </li>
      </ul>
    </header>
  );
};

function mapStateToProps(state) {
  return {
    currentuser: state.user.currentuser,
  };
}

HeaderAuth.propTypes = {
  currentuser: PropTypes.objectOf(PropTypes.object).isRequired,
  logoutAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(HeaderAuth);
