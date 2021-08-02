import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/user-info-action';
import styles from './Edit-profile-form.module.scss';

const EditProfileForm = ({ editUserAuthorized }) => {
  const currentUser = JSON.parse(localStorage.getItem('User'));
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    editUserAuthorized(data);
    history.push('/');
  };

  return (
    <div className={styles['edit-profile-form']}>
      <p className={styles['edit-profile-form__title']}>Edit profile</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className={styles['edit-profile-form__input-label']}>
          User name
          <input
            type="text"
            id="username"
            className={styles['edit-profile-form__input']}
            placeholder={currentUser.username}
            name="userName"
            {...register('username', {
              required: 'USERNAME REQUIRED',
              minLength: { value: 3, message: 'Your name needs to be at least 3 characters.' },
              maxLength: { value: 20, message: 'Your name needs to be at max 20 characters.' },
            })}
          />
        </label>
        {errors.username && <p className={styles.errors}>{errors.username.message}</p>}
        <label htmlFor="email-address" className={styles['edit-profile-form__input-label']}>
          Email address
          <input
            type="text"
            id="email-address"
            className={styles['edit-profile-form__input']}
            placeholder={currentUser.email}
            name="email-address"
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
        <label htmlFor="new-password" className={styles['edit-profile-form__input-label']}>
          New password
          <input
            type="password"
            id="new-password"
            className={styles['edit-profile-form__input']}
            placeholder="New Password"
            name="newPassword"
            {...register('password', {
              minLength: { value: 8, message: 'Your password needs to be at least 8 characters.' },
              maxLength: { value: 40, message: 'Your password needs to be at max 40 characters.' },
            })}
          />
        </label>
        {errors.password && <p className={styles.errors}>{errors.password.message}</p>}
        <label htmlFor="avatar-image" className={styles['edit-profile-form__input-label']}>
          Avatar image (url)
          <input
            type="url"
            id="avatar-image"
            className={styles['edit-profile-form__input']}
            placeholder={currentUser.image}
            name="avatarimage"
            {...register('avatarimage', {
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Enter a valid url address',
              },
            })}
          />
        </label>
        {errors.avatarimage && <p className={styles.errors}>{errors.avatarimage.message}</p>}
        <input type="submit" className={styles['edit-profile-form__input-submit']} value="Save" />
      </form>
    </div>
  );
};

EditProfileForm.propTypes = {
  editUserAuthorized: PropTypes.func.isRequired,
};

export default connect(null, actions)(EditProfileForm);
