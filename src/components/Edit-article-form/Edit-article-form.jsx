import { React } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateArticleForm from '../Create-article-form/Create-article-form';

const EditArticleForm = ({ oneArticle }) => <CreateArticleForm editedArticle={oneArticle} />;

function mapStateToProps(state) {
  return {
    oneArticle: state.load.oneArticle,
  };
}

EditArticleForm.propTypes = {
  oneArticle: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(EditArticleForm);
