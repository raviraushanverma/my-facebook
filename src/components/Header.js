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
    <header className="header">
      <div>
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <ul className="display-flex">
        {!isUserLoggedIn() && (
          <>
            <li>
              <button
                type="button"
                className="btn btn-link"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Login
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-link"
                data-bs-toggle="modal"
                data-bs-target="#signupModal"
              >
                signup
              </button>
            </li>
          </>
        )}
        {isUserLoggedIn() && (
          <li>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => {
                logout();
              }}
            >
              logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};
export default Header;
