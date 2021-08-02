import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './CreateTagsForm.module.scss';

const CreateTagsForm = ({ tags, onRemoveTag }) => {
  const elements = tags.map((tag, index) => (
    <div key={uuidv4()}>
      <input placeholder="Tag" id="tag" className={styles['tags-form__input']} name="tag" defaultValue={tag} />
      <button className={styles['tags-form__tag-button']} type="submit" onClick={() => onRemoveTag(index)}>
        Delete
      </button>
    </div>
  ));

  return <div className={styles['tags-form']}>{elements}</div>;
};

CreateTagsForm.propTypes = {
  tags: PropTypes.instanceOf(Array).isRequired,
  onRemoveTag: PropTypes.func.isRequired,
};

export default CreateTagsForm;
