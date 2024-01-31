import { createContext, useContext, useEffect, useState } from "react";
import { SessionContext } from "./SessionProvider";

export const EventSourceContext = createContext();

export const subscribeForServerSentEvent = (loggedInUser) => {
  return new EventSource(
    `${process.env.REACT_APP_SERVER_END_PONT}/subscribe_for_events/${loggedInUser._id}`
  );
};

const EventSourceProvider = (props) => {
  const { loggedInUser } = useContext(SessionContext);
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    let timeoutID;
    const eventSourceObj = (() => {
      if (loggedInUser) {
        const eventSource = subscribeForServerSentEvent(loggedInUser);

        eventSource.onopen = function (evt) {
          console.log("SSE opened");
        };

        eventSource.onerror = function (error) {
          console.log("SSE error", error);
          timeoutID = setTimeout(() => {
            // If Error, We are re-connecting to SSE after each 5 secs
            console.log("Re-connecting to SSE");
            const eventSource = subscribeForServerSentEvent(loggedInUser);
            setEventSource(eventSource);
          }, 5000);
        };

        setEventSource(eventSource);
        return eventSource;
      }
    })();
    return () => {
      clearTimeout(timeoutID);
      if (eventSourceObj) {
        eventSourceObj.close();
      }
    };
  }, [loggedInUser]);

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
