import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import classes from "../../styles/Register.css";

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

    const url =
      "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";

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
        <div className={`${classes.register} mt-5`}>
          <div className="container-fluid px-5">
            <div className="row align-items-center text-center">
              <div className={`${classes.formo} col-md-6`}>
                <h1 className="display-4 text-center">Sign Up</h1>
                <div className="mb-2">
                  <input
                    type="file"
                    onChange={this.fileUploadHandler}
                    style={{ color: "white" }}
                  />
                  <button
                    className="btn btn-outline-light text-uppercase"
                    onClick={this.onImageUpload}
                  >
                    Add avatar
                  </button>
                </div>
                {this.state.image && (
                  <alert className="alert-success alert-md p-1">
                    Image uploaded successfuly{" "}
                  </alert>
                )}
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user m-2" />
                        </span>
                      </div>
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
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="classes.icono input-group-text">
                          <i className="fa fa-envelope m-2" />
                        </span>
                      </div>
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
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-lock m-2" />
                        </span>
                      </div>
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
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-lock m-2" />
                        </span>
                      </div>
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
                        <div className="invalid-feedback">
                          {errors.password2}
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="btn btn-block btn-lg btn-outline-light text-uppercase primary-color">
                    <i className="far fa-hand-point-right mr-2" /> Submit
                  </button>
                </form>
              </div>
              <div className="col-md-6 ml-auto">
                <p className="lead w-75 mx-auto text-dark">
                  Create an account and start chatting to everybody around the
                  world
                </p>
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
