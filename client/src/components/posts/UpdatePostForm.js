import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { updatePost, getPost } from "../../actions/postActions";
import isEmpty from "../../validation/is-empty";

class UpdatePostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
    if (newProps.post.post) {
      const post = newProps.post.post;

      post.text = !isEmpty(post.text) ? post.text : "";

      // Set component fields state
      this.setState({
        text: post.text
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { _id } = this.props.post.post;

    const postData = {
      text: this.state.text,
      name: user.name,
      image: user.image
    };

    this.props.updatePost(postData, _id);
    this.props.history.push("/feed");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="post-form m-5">
                <div className="card card-info">
                  <div
                    className="card-header  "
                    style={{ background: "#ffff1a" }}
                  >
                    Edit Your Post
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <TextAreaFieldGroup
                          placeholder="Create a post"
                          name="text"
                          value={this.state.text}
                          onChange={this.onChange}
                          error={errors.text}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-dark"
                        style={{ background: "#ffff1a", color: "#1a1a00" }}
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdatePostForm.propTypes = {
  updatePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post
});

export default connect(
  mapStateToProps,
  { updatePost, getPost }
)(UpdatePostForm);
