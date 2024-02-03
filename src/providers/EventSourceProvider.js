import { createContext, useEffect, useState } from "react";
import { getLoggedInUserFromLocalStorage } from "./SessionProvider";

export const EventSourceContext = createContext();

export const subscribeForServerSentEvent = () => {
  const loggedInUser = getLoggedInUserFromLocalStorage();
  return new EventSource(
    `${process.env.REACT_APP_SERVER_END_PONT}/subscribe_for_live_updates/${
      loggedInUser ? loggedInUser._id : ""
    }`
  );
};

const EventSourceProvider = (props) => {
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    const newEventSource = subscribeForServerSentEvent();
    setEventSource(newEventSource);
    return () => {
      newEventSource.close();
    };
  }, []);

  useEffect(() => {
    let timeoutID;
    if (eventSource) {
      eventSource.onopen = function (evt) {
        console.log("SSE opened");
      };
      eventSource.onerror = function (error) {
        console.log("SSE error", error);
        const loggedInUser = getLoggedInUserFromLocalStorage();
        if (loggedInUser) {
          timeoutID = setTimeout(() => {
            // If Error, We are re-connecting to SSE after each 5 minitues
            console.log("Re-connecting to SSE");
            const eventSource = subscribeForServerSentEvent();
            setEventSource(eventSource);
          }, 5 * 60000);
        }
      };
    }

    return () => {
      clearTimeout(timeoutID);
    };
  }, [eventSource]);

  return (
    <EventSourceContext.Provider
      value={{
        eventSource,
        setEventSource,
      }}
    >
      {props.children}
    </EventSourceContext.Provider>
  );
};

export default EventSourceProvider;
