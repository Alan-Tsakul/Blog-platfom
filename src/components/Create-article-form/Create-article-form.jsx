import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import CreateTagsForm from '../CreateTagsForm/CreateTagsForm';
import * as actions from '../../actions/load-articles-action';
import styles from './Create-article-form.module.scss';

const CreateArticleForm = ({ sendArticle, editedArticle, sendEditedArticle }) => {
  const [tagsList, setState] = useState([]);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    data.tagList = [...tagsList];
    if (editedArticle !== undefined) {
      const Slug = editedArticle.slug;
      sendEditedArticle(data, Slug);
    }
    sendArticle(data);
    history.push('/');
  };

  const preloadedValues = {
    tagList: watch('tagList'),
  };
  
  const tags = preloadedValues.tagList;

  function onAddTag() {
    setState([...tagsList, tags]);
  }

  function onRemoveTag(removeIndex) {
    setState(tagsList.filter((item, index) => index !== removeIndex));
  }

  return (
    <div className={styles['create-article-form']}>
      <p className={styles['create-article-form__title']}>
        {editedArticle !== undefined ? 'Edit article' : 'Create new article'}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} id="example">
        <label htmlFor="title" className={styles['create-article-form__input-label']}>
          Title
          <input
            type="text"
            id="title"
            className={styles['create-article-form__input']}
            placeholder="title"
            name="title"
            defaultValue={editedArticle !== undefined ? editedArticle.title : null}
            {...register('title', {
              required: 'TITLE REQUIRED',
            })}
          />
        </label>
        {errors.title && <p className={styles.errors}>{errors.title.message}</p>}
        <label htmlFor="description" className={styles['create-article-form__input-label']}>
          Short description
          <input
            type="text"
            id="description"
            className={styles['create-article-form__input']}
            placeholder="title"
            name="description"
            defaultValue={editedArticle !== undefined ? editedArticle.description : null}
            {...register('description', {
              required: 'SHORT DESCRIPTION REQUIRED',
            })}
          />
        </label>
        {errors.description && <p className={styles.errors}>{errors.description.message}</p>}
        <label htmlFor="body" className={styles['create-article-form__input-label']}>
          Text
          <textarea
            id="body"
            className={styles['create-article-form__textarea']}
            rows="8"
            cols="105"
            placeholder="Text"
            name="body"
            defaultValue={editedArticle !== undefined ? editedArticle.body : null}
            {...register('body', {
              required: 'TEXT REQUIRED',
            })}
          />
        </label>
        {errors.body && <p className={styles.errors}>{errors.body.message}</p>}
        <span className={styles['create-article-form__input-label']}>Tags</span>

        <CreateTagsForm
          tags={editedArticle !== undefined ? [...tagsList, ...editedArticle.tagList] : tagsList}
          onRemoveTag={onRemoveTag}
        />
        <div className={styles['create-article-form__tags-wrapper']}>
          <input
            placeholder="Tag"
            id="tagList"
            className={styles['create-article-form__input']}
            name="tagList"
            style={{ width: '250px' }}
            {...register('tagList')}
          />
          <button
            className={styles['create-article-form__tag-button-hidden']}
            type="button"
            style={tagsList.length === 0 ? { display: 'none' } : { display: 'block' }}
          >
            Delete
          </button>
          <button className={styles['create-article-form__tag-button']} type="button" onClick={onAddTag}>
            Add tag
          </button>
        </div>
      </form>
      <button form="example" type="submit" className={styles['create-article-form__input-submit']}>
        Send
      </button>
    </div>
  );
};

CreateArticleForm.propTypes = {
  tags: PropTypes.string.isRequired,
  sendArticle: PropTypes.func.isRequired,
  sendEditedArticle: PropTypes.func.isRequired,
  editedArticle: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(null, actions)(CreateArticleForm);
