import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>
        © 2021 What the Earth{" "}
        <span role="img" aria-label="earth">
          🌍
        </span>
      </p>
      <p>
        Made with
        <span role="img" aria-label="heart">
          💛
        </span>
        at Ironhack
      </p>
      <Link to="/about">Notre mission</Link>
      <img style={{ width: "80px" }} src="/wheat.png" alt="Logo" />
    </footer>
  );
};

export default Footer;
