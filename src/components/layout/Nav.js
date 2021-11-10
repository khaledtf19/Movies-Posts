import React, { useContext, useState } from "react";
import { Link, navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const [sWidth, setSWidth] = useState(window.screen.width);

  window.onresize = function () {
    setSWidth(window.screen.width);
  };
  if (sWidth > 425) {
    return (
      <div>
        <header>
          <div className="nav__container">
            <nav className="nav">
              <ul className="nav__list">
                <li className="nav__item">
                  <Link to="/" className="nav__link">
                    Home
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/profile" className="nav__link">
                    profile
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/posts" className="nav__link">
                    Posts
                  </Link>
                </li>
              </ul>

              {user ? (
                <ul className="nav__list nav__list--btns">
                  <li className="nav__item">
                    <Link
                      className="nav__link nav__button primary__btn"
                      to="/login"
                      onClick={() => {
                        signOut(auth);
                      }}
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="nav__list nav__list--btns">
                  <li className="nav__item">
                    <Link
                      to="/login"
                      className="nav__link nav__button primary__btn"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav__item">
                    <Link
                      to="/signup"
                      className="nav__link nav__button primary__btn"
                    >
                      Register
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </header>
      </div>
    );
  } else {
    return (
      <div className="pos-f-t">
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/" className="nav__link">
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/profile" className="nav__link">
                  profile
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/posts" className="nav__link">
                  Posts
                </Link>
              </li>

              {user ? (
                <div>
                  <li className="nav__item">
                    <Link
                      className="nav__link nav__button primary__btn"
                      to="/login"
                      onClick={() => {
                        signOut(auth);
                      }}
                    >
                      Sign out
                    </Link>
                  </li>
                </div>
              ) : (
                <div>
                  <li className="nav__item">
                    <Link
                      to="/login"
                      className="nav__link nav__button primary__btn"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav__item">
                    <Link
                      to="/signup"
                      className="nav__link nav__button primary__btn"
                    >
                      Register
                    </Link>
                  </li>
                </div>
              )}
            </ul>
            <span className="text-muted">
              Hi : {user ? user.displayName : ""}
            </span>
          </div>
        </div>
        <nav className="navbar navbar-dark bg-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>
    );
  }
};

export default Navbar;
