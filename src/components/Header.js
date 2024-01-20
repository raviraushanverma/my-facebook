import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../utility";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate(0);
  };

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-light bg-light"
      style={{ boxShadow: "rgb(0, 0, 0) 0px 4px 10px -9px" }}
    >
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">
                About
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">
                Contact
              </a>
            </li> */}
          </ul>
          <div className="d-flex">
            {isUserLoggedIn() ? (
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            ) : (
              <div className="d-flex">
                <button
                  style={{ marginRight: "10px" }}
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  LOGIN
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#signupModal"
                >
                  SIGN UP
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
