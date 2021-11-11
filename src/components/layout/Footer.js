import React from "react";
import github from "../../img/GitHub-Mark-Light-64px.png";

function Footer() {
  return (
    <footer className="footer">
      <p>
        <a
          href="https://github.com/khaledtf19"
          target="_blank"
          rel="noreferrer"
        >
          Khaled <img src={github} alt="github mark" className="github__mark" />
        </a>
      </p>
    </footer>
  );
}

export default Footer;
