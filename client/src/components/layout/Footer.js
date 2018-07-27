import React from "react";
import classes from "../../styles/Footer.css";
const Footer = () => {
  return (
    <div>
      <footer
        className={`${classes.footy} mt-5 p-4 text-center navbar-fixed-bottom`}
      >
        Copyright &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Footer;
