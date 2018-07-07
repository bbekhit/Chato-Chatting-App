import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      uploadedFile: null,
      image: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      uploadedFile: this.state.uploadedFile,
      image: this.state.image
    };

    this.props.registerUser(newUser, this.props.history);
  };

  fileUploadHandler = e => {
    this.setState({
      uploadedFile: e.target.files[0]
    });
  };

  onImageUpload = () => {
    const { uploadedFile } = this.state;
    const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
    const cloudName = process.env.REACT_APP_CLOUD_NAME;

    const url = "https://api.cloudinary.com/v1_1/dqej6sbaj/image/upload";

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("upload_preset", uploadPreset);

    axios
      .post(url, formData)
      .then(res => {
        // console.log(res);
        if (res.data.secure_url !== "") {
          this.setState({
            image: res.data.secure_url
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto h-25 formy">
                <h1 className="display-4 text-center">Sign Up</h1>
                <div className="mb-2">
                  <input type="file" onChange={this.fileUploadHandler} />
                  <button
                    className="btn btn-info btn-sm mt-1"
                    onClick={this.onImageUpload}
                  >
                    upload avatar
                  </button>
                </div>
                {this.state.image && (
                  <alert className="alert-success alert-md">
                    Image uploaded successfuly{" "}
                  </alert>
                )}
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                      })}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password2
                      })}
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">{errors.password2}</div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
