import { createContext, useEffect, useState } from "react";

export const EventSourceContext = createContext();

export const subscribeForServerSentEvent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return new EventSource(
    `${process.env.REACT_APP_SERVER_END_PONT}/subscribe_for_live_updates/${
      user ? user._id : ""
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
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
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
