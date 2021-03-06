import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  library.add(fab, faEnvelope);
  const year = new Date().getFullYear();
  return (
    <footer className="footerContent">
      <div id="footer-icons">
        <a
          href="https://twitter.com/Diamond74435333"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </a>
        <a
          href="https://www.instagram.com/diamondzhelp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={["fab", "instagram"]} />
        </a>
        <a
          href="https://www.facebook.com/storediamondz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={["fab", "facebook"]} />
        </a>
        <a href="/contact">
          <FontAwesomeIcon icon="envelope" />
        </a>
      </div>
      <span> &copy; Copyright 1949 - {year} Diamondz</span>
    </footer>
  );
}

export default Footer;
