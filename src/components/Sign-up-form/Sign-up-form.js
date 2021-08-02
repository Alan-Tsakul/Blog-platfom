import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/user-info-action';
import styles from './Sign-up-form.module.scss';

const SignUp = ({ putUserRegistration }) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    putUserRegistration(data.username, data.email, data.password);
    history.push('/sign-in');
  };

  return (
    <div className={styles['sign-up']}>
      <p className={styles['sign-up__title']}>Create new account</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-up__form']}>
        <label htmlFor="username" className={styles['sign-up__input-label']}>
          Username
          <input
            type="text"
            className={styles['sign-up__input']}
            placeholder="Username"
            name="username"
            id="username"
            {...register('username', {
              required: 'USERNAME REQUIRED',
              minLength: { value: 3, message: 'Your name needs to be at least 3 characters.' },
              maxLength: { value: 20, message: 'Your name needs to be at max 20 characters.' },
            })}
          />
        </label>
        {errors.username && <p className={styles.errors}>{errors.username.message}</p>}
        <label htmlFor="email" className={styles['sign-up__input-label']}>
          Email address
          <input
            type="text"
            className={styles['sign-up__input']}
            id="email"
            placeholder="Email"
            name="email"
            {...register('email', {
              required: 'EMAIL REQUIRED',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Enter a valid e-mail address',
              },
            })}
          />
        </label>
        {errors.email && <p className={styles.errors}>{errors.email.message}</p>}
        <label htmlFor="password" className={styles['sign-up__input-label']}>
          Password
          <input
            type="password"
            className={styles['sign-up__input']}
            id="password"
            placeholder="Password"
            name="password"
            {...register('password', {
              required: 'PASSWORD REQUIRED',
              minLength: { value: 8, message: 'Your password needs to be at least 8 characters.' },
              maxLength: { value: 40, message: 'Your password needs to be at max 40 characters.' },
              validate: (value) => value === watch('repeatpassword') || "Passwords don't match.",
            })}
          />
        </label>
        {errors.password && <p className={styles.errors}>{errors.password.message}</p>}
        <label htmlFor="repeat password" className={styles['sign-up__input-label']}>
          Repeat Password
          <input
            type="password"
            className={styles['sign-up__input']}
            id="repeat password"
            placeholder="Repeat password"
            name="repeat password"
            {...register('repeatpassword', {
              required: 'PASSWORD REQUIRED',
              minLength: { value: 8, message: 'Your password needs to be at least 8 characters.' },
              maxLength: { value: 40, message: 'Your password needs to be at max 40 characters.' },
              validate: (value) => value === watch('password') || "Passwords don't match.",
            })}
          />
        </label>
        {errors.repeatPassword && <p className={styles.errors}>{errors.repeatPassword.message}</p>}
        <div className={styles['sign-up__divider']}>
          <label htmlFor="checkbox" className={styles['sign-up__checkbox-label']}>
            <input type="checkbox" id="checkbox" name="checkbox" className={styles['sign-up__checkbox']} 
            required/> &nbsp;I
            agree to the processing of my personal information
          </label>
        </div>
        <button type="submit" className={styles['sign-up__input-submit']}>
          Create
        </button>
        <div className={styles['sign-up__link']}>
          <span>Already have an account?</span>
          <Link to="/sign-in">&nbsp; Sign In</Link>
        </div>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  putUserRegistration: PropTypes.func.isRequired,
};

export default connect(null, actions)(SignUp);
