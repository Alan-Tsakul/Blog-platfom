import { React, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Popconfirm, message } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/load-articles-action';
import Article from '../Article/Article';
import styles from './Single-article.module.scss';

const SingleArticle = ({ itemId, getSingleArticle, oneArticle, item, deleteArticle }) => {
  const history = useHistory();
  const request = useCallback(() => {
    getSingleArticle(itemId);
  }, [itemId, getSingleArticle]);

  useEffect(() => {
    request();
  }, []); //eslint-disable-line

  function confirm() {
    deleteArticle(itemId);
    history.push('/');
  }

  function cancel() {
    message.error('Click on No');
  }

  const confirmDelete = (
    <Popconfirm
      title="Are you sure to delete this article?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <a href="#" style={{ color: 'red' }}>
        Delete
      </a>
    </Popconfirm>
  );

  const buttons = (
    <div>
      <button type="button" className={styles['single-article__button-delete']}>
        {confirmDelete}
      </button>
      <Link to={`/articles/${itemId}/edit`}>
        <button type="button" className={styles['single-article__button-edit']}>
          Edit
        </button>
      </Link>
    </div>
  );

  return (
    <div className={styles['single-article']}>
      <Article item={Object.keys(oneArticle).length === 0 ? item : oneArticle} buttons={buttons} />
      <div className={styles['single-article__text']}>
        {Object.keys(oneArticle).length === 0 ? item.body : oneArticle.body}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    oneArticle: state.load.oneArticle,
    item: state.load.articles[0],
  };
}

SingleArticle.propTypes = {
  getSingleArticle: PropTypes.func.isRequired,
  oneArticle: PropTypes.objectOf(PropTypes.object).isRequired,
  itemId: PropTypes.objectOf(PropTypes.object).isRequired,
  item: PropTypes.objectOf(PropTypes.object).isRequired,
  deleteArticle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(SingleArticle);
