import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import PostItem from "./PostItem.js";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import { setTextFilter } from "../../actions/filtersActions";
import selector from "../../select/select";
import classes from "../../styles/Posts.css";

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
      <div className={`${classes.feed} mt-5`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-5">
              <PostForm />
              <div className="my-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-search m-2" />
                    </span>{" "}
                  </div>{" "}
                  <input
                    type="text"
                    className=""
                    placeholder=" Search authors"
                    value={this.props.filters.text}
                    onChange={this.onSearchTextChange}
                  />{" "}
                </div>{" "}
              </div>{" "}
              {postContent}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
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
  {
    getPosts,
    setTextFilter
  }
)(Posts);
