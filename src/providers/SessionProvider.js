import { createContext, useEffect, useState } from "react";

export const SessionContext = createContext();

export const getLoggedInUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const SessionProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(
    getLoggedInUserFromLocalStorage()
  );

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  return (
    <SessionContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
