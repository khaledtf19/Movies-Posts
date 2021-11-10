import React from "react";
import github from "../../img/GitHub-Mark-Light-64px.png";

function Footer() {
  return (
    <div className="footer__container">
      <footer>
        <p>
          this site made by{" "}
          <a
            href="https://github.com/khaledtf19"
            target="_blank"
            rel="noreferrer"
          >
            Khaled{" "}
            <img src={github} alt="github mark" className="github__mark" />
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
