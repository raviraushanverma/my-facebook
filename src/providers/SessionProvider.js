import { createContext, useEffect, useState } from "react";

export const SessionContext = createContext();

const SessionProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("user"))
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
