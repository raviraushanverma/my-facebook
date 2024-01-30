import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SessionContext = createContext();

const SessionProvider = (props) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate, loggedInUser]);

  return (
    <SessionContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
