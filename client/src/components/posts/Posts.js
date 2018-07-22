import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import PostItem from "./PostItem.js";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import { setTextFilter } from "../../actions/filtersActions";
import selector from "../../select/select";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  onSearchTextChange = e => {
    this.props.setTextFilter(e.target.value);
  };

  render() {
    const { posts, loading } = this.props.post;
    const { postsFiltered } = this.props;

    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = postsFiltered.map(post => (
        <PostItem key={post._id} post={post} />
      ));
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              <input
                type="text"
                placeholder="Search Posts"
                className="mb-3"
                value={this.props.filters.text}
                onChange={this.onSearchTextChange}
              />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postsFiltered: selector(state.post, state.filters),
  post: state.post,
  filters: state.filters
});

export default connect(
  mapStateToProps,
  { getPosts, setTextFilter }
)(Posts);
