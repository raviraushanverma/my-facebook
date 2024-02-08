import { createContext, useEffect, useState } from "react";
import { apiCall } from "../utils";
import { useNavigate } from "react-router";

export const SessionContext = createContext();

export const getLoggedInUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const SessionProvider = (props) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState();
  const [isLoggedInUserLoading, setIsLoggedInUserLoading] = useState(true);

  useEffect(() => {
    const clearAndLogout = () => {
      navigate("/");
      localStorage.removeItem("user");
      setLoggedInUser(null);
      setIsLoggedInUserLoading(false);
    };
    (async () => {
      const tempLoggedInUser = getLoggedInUserFromLocalStorage();
      if (tempLoggedInUser && tempLoggedInUser._id) {
        setIsLoggedInUserLoading(true);
        const response = await apiCall({
          url: `${process.env.REACT_APP_SERVER_END_PONT}/get-me`,
          method: "POST",
          body: { loggedInUserId: tempLoggedInUser._id },
        });
        if (response.me) {
          setLoggedInUser(response.me);
        } else {
          clearAndLogout();
        }
        setIsLoggedInUserLoading(false);
      } else {
        clearAndLogout();
      }
    })();
  }, [navigate]);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  return (
    <SessionContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        isLoggedInUserLoading,
        setIsLoggedInUserLoading,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
