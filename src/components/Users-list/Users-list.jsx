import React from 'react';
import toDate from 'date-fns/toDate';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { useAuth } from '../../routers/use-auth';
import styles from './Users-list.module.scss';

const UsersList = ({ item, buttons }) => { 
  const date = item.createdAt.substring(0, 10);
  const formatedDate = String(format(toDate(new Date(date)), 'MMMM dd, yyyy'));
  const auth = useAuth();

  const stub = '/images/user.svg';
  const picture = !item.author.image ? stub : item.author.image

  return (
    <div>
      <div className={styles.user__block}>
        <div className={styles.user__info}>
          <span className={styles.user__name}>{item.author.username}</span>
          <p className={styles.user__date}>{formatedDate}</p>
        </div>
        <img src={picture} alt="user" className={styles.user__image} />
      </div>
      {auth.isAuth ? buttons : null}
    </div>
  );
};

UsersList.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
  buttons:  PropTypes.objectOf(PropTypes.object).isRequired,
};

export default UsersList;
