import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../../img/warbler-logo.png";
import classes from "../../styles/Navbar.css";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  componentDidMount() {
    {
      document.querySelector(".navbar-toggler").innerHTML =
        '<i class="fa fa-arrow-down fa-2x"></i>';
    }
  }
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className={`${classes.linko} nav-link mr-4 mt-1`} to="/feed">
            Posts Feed
          </Link>
        </li>
        <li className="nav-item">
          <img
            className="rounded-circle mr-1 mt-2"
            src={user.image}
            alt={user.name}
            style={{ width: "35px", height: "35px" }}
          />
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogout}
            className={`${classes.linko} nav-link mt-1`}
            style={{ padding: "8px", textDecoration: "none" }}
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav fixed ml-auto ">
        <li className="nav-item">
          <Link className={`${classes.linko} nav-link mt-1`} to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`${classes.linko} nav-link mt-1`} to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <div>
        <nav
          className={`${classes.navo} navbar navbar-expand-sm mb-5 fixed-top`}
        >
          <div className="container">
            <div className="navbar-header">
              <Link
                to="/"
                className="navbar-brand"
                style={{ color: "#1a1a00" }}
              >
                <img
                  src={Logo}
                  alt="bird"
                  className="mr-2"
                  style={{ width: "50px" }}
                />Chato
              </Link>
            </div>
            <button
              className={`${classes.togglo} navbar-toggler`}
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
