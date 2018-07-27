import React from "react";
import classes from "../../styles/Footer.css";
const Footer = () => {
  return (
    <div>
      <footer className={`${classes.footy} p-4 text-center mt-5`}>
        Copyright &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Footer;
