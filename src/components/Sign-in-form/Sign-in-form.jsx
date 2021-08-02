import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { notification } from 'antd';
import * as actions from '../../actions/user-info-action';
import styles from './Sign-in-form.module.scss';
import 'antd/dist/antd.css';

const SignIn = ({ putUserAuthentication }) => {
  const currentUser = JSON.parse(localStorage.getItem('User'));
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const openNotification = () => {
    notification.open({
      message: 'Warning!',
      description: 'Try again, please!',
    });
  };

  const onSubmit = (data) => {
    putUserAuthentication(data.email, data.password);
    if (currentUser) {
      history.push('/');
    }
    openNotification();
  };

  return (
    <div className={styles['sign-in']}>
      <p className={styles['sign-in__title']}>Sign in</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email address" className={styles['sign-in__input-label']}>
          Email address
          <input
            type="text"
            id="email address"
            className={styles['sign-in__input']}
            placeholder="Email address"
            name="email"
            {...register('email', {
              required: 'Enter your e-mail',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Enter a valid e-mail address',
              },
            })}
          />
        </label>
        {errors.email && <p className={styles.errors}>{errors.email.message}</p>}
        <label htmlFor="Password" className={styles['sign-in__input-label']}>
          Password
          <input
            type="password"
            id="password"
            className={styles['sign-in__input']}
            placeholder="Password"
            name="password"
            {...register('password', {
              required: 'PASSWORD REQUIRED',
              minLength: { value: 8, message: 'Your password needs to be at least 8 characters.' },
              maxLength: { value: 20, message: 'Your password needs to be at max 20 characters.' },
            })}
          />
        </label>
        {errors.password && <p className={styles.errors}>{errors.password.message}</p>}
        <input type="submit" className={styles['sign-in__input-submit']} value="Login" />
        <div className={styles['sign-in__link']}>
          <span>Don’t have an account?</span>
          <Link to="/sign-up">&nbsp; Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  putUserAuthentication: PropTypes.func.isRequired,
};

export default connect(null, actions)(SignIn);
