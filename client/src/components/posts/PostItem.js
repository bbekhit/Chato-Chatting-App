import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import classes from "../../styles/PostItem.css";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body m-5">
        <div className="row">
          <div className="col-md-2">
            <div>
              <img
                className="img-fluid rounded-circle d-none d-md-block"
                src={post.image}
                alt=""
                style={{ marginTop: "-75px", border: "3px solid yellow" }}
              />
            </div>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link
                  to={`/post/${post._id}`}
                  className={`${classes.linko} btn mr-1`}
                >
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <div className="mt-3">
                    <i
                      onClick={this.onDeleteClick.bind(this, post._id)}
                      className="fas fa-times mr-2"
                      style={{
                        border: "1px solid red",
                        borderRadius: "50%",
                        padding: "12px",
                        color: "red",
                        cursor: "pointer"
                      }}
                    />

                    <Link
                      to={`/${post._id}/edit`}
                      style={{
                        textDecoration: "none"
                      }}
                    >
                      <i
                        className="fa fa-edit"
                        style={{
                          border: "1px solid blue",
                          borderRadius: "50%",
                          padding: "10px"
                        }}
                      />
                    </Link>
                  </div>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
