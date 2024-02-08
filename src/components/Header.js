import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { SessionContext } from "../providers/SessionProvider";
import { useContext, useEffect, useRef, useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import UserAvatar from "./UserAvatar";
import { EventSourceContext } from "../providers/EventSourceProvider";
import { apiCall } from "../utils";
import Loading from "./Loading";
import { WebsocketContext } from "../providers/WebsocketProvider";

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(SessionContext);
  const { eventSource } = useContext(EventSourceContext);
  const { socket, setSocket } = useContext(WebsocketContext);
  const navigate = useNavigate();
  const [autocomplete, setAutocomplete] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [isUserFindLoading, setIsUserFindLoading] = useState(false);
  const [isSearchInputShow, setIsSearchInputShow] = useState(false);
  const inputSearch = useRef();

  const logout = async () => {
    if (eventSource) {
      eventSource.close();
    }
    if (socket) {
      socket.close();
      setSocket(null);
    }
    navigate("/");
    localStorage.removeItem("user");
    setLoggedInUser(null);
  };

  useEffect(() => {
    if (isSearchInputShow && inputSearch) {
      inputSearch.current.focus();
    }
  }, [isSearchInputShow]);

  useEffect(() => {
    (async () => {
      if (autocomplete) {
        setIsUserFindLoading(true);
        const res = await apiCall({
          url: `${process.env.REACT_APP_SERVER_END_PONT}/autocomplete/${autocomplete}`,
        });
        if (res) {
          setFoundUsers(res.users);
        }
        setIsUserFindLoading(false);
      }
    })();

    return () => {
      setIsUserFindLoading(false);
    };
  }, [autocomplete]);

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-light bg-light"
      style={{ boxShadow: "rgb(0, 0, 0) 0px 4px 10px -9px" }}
    >
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          <Logo />
        </Link>
        <div className="d-flex">
          {loggedInUser ? (
            <div className="d-flex align-items-center">
              <div style={{ marginRight: "10px" }}>
                <div className="dropdown">
                  <div data-bs-toggle="dropdown" aria-expanded="false">
                    {!isSearchInputShow && (
                      <i
                        style={{ fontSize: "20px" }}
                        className="fa-solid fa-magnifying-glass"
                        onClick={() => {
                          setIsSearchInputShow(true);
                        }}
                      ></i>
                    )}
                    {isSearchInputShow && (
                      <form>
                        <input
                          className="form-control me-2"
                          id="findUserDropDown"
                          placeholder="Search for friends"
                          value={autocomplete}
                          ref={inputSearch}
                          onBlur={() => {
                            setIsSearchInputShow(false);
                            setAutocomplete("");
                          }}
                          onChange={(e) => {
                            setAutocomplete(e.target.value);
                          }}
                        ></input>
                      </form>
                    )}
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="findUserDropDown"
                  >
                    {isUserFindLoading ? (
                      <li style={{ textAlign: "center" }}>
                        <Loading />
                      </li>
                    ) : (
                      <>
                        {foundUsers.map((user) => {
                          return (
                            <Link key={user._id} to={`/profile/${user._id}`}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "10px",
                                }}
                              >
                                <UserAvatar
                                  profilePicURL={user.profilePicURL}
                                />
                                <div style={{ marginLeft: "5px" }}>
                                  {user.name}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                        {!!autocomplete &&
                          !isUserFindLoading &&
                          foundUsers.length === 0 && (
                            <li style={{ textAlign: "center" }}>
                              <h6>User not found!</h6>
                            </li>
                          )}
                      </>
                    )}
                  </ul>
                </div>
              </div>
              {!isSearchInputShow && (
                <>
                  <div style={{ marginRight: "10px" }}>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Link to={`/profile/${loggedInUser._id}`} title="Account">
                        <UserAvatar
                          profilePicURL={loggedInUser.profilePicURL}
                          styleForUserAvatar={{ width: "33px", height: "33px" }}
                          styleForDefaultUserAvatar={{ fontSize: "1em" }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <NotificationDropdown />
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
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
    </nav>
  );
};
export default Header;
