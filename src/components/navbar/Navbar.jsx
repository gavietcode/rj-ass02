import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  //  Change background-color
  const [navbar, setNavbar] = useState(false);

  const changBackgroundColor = () => {
    // console.log(window.scrollY);
    if (window.scrollY > 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changBackgroundColor);

  return (
    <div className="nav-bg">
      <nav className={navbar ? "nav-flex nav-bg_black" : "nav-flex"}>
        <h1>
          <Link className="nav-link" to="/">
            Movie App
          </Link>
        </h1>
        <h1>
          <Link className="nav-link" to="/search">
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </h1>
      </nav>
    </div>
  );
};

export default Navbar;
