import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="card card-body my-5">
        <div className="row">
          <div className="col-md-2">
            <div>
              <img
                className=" img-fluid rounded-circle  d-none d-md-block"
                src={comment.image}
                alt="avatar"
              />
            </div>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-8">
            <p className="lead my-4">{comment.text}</p>
          </div>
          <div className="col-md-2 d-flex align-items-center justify-content-center">
            {comment.user === auth.user.id ? (
              <i
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                className="fas fa-times float-right"
                style={{
                  border: "1px solid red",
                  borderRadius: "50%",
                  padding: "12px",
                  color: "red",
                  cursor: "pointer"
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
