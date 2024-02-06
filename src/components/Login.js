import { useState } from "react";
import Logo from "./Logo";
import Alert from "./Alert";
import Loading from "./Loading";
import { useContext } from "react";
import { SessionContext } from "../providers/SessionProvider";
import { NotificationContext } from "../providers/NotificationProvider";
import { apiCall } from "../utils";
import {
  EventSourceContext,
  subscribeForServerSentEvent,
} from "../providers/EventSourceProvider";

const Login = () => {
  const { setLoggedInUser } = useContext(SessionContext);
  const { setEventSource } = useContext(EventSourceContext);
  const { playNotificationSound } = useContext(NotificationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertData, setAlertData] = useState({ enable: false });
  const [loading, setLoading] = useState();
  const [showPassword, setShowPassword] = useState();

  const login = async (event) => {
    event.preventDefault();
    setAlertData({ enable: false });
    setLoading(true);
    const response = await apiCall({
      url: `${process.env.REACT_APP_SERVER_END_PONT}/login`,
      method: "POST",
      body: {
        email: email,
        password: password,
      },
    });
    if (response) {
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        setLoggedInUser(response.user);
        setEventSource(subscribeForServerSentEvent());
        playNotificationSound();
        document.getElementById("modalCloseButton").click();
      } else {
        setAlertData({ ...response, enable: true });
      }
    }
    setLoading(false);
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title w-100 text-center">
              <Logo />
            </div>
            <button
              type="button"
              id="modalCloseButton"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form
              className="form"
              onSubmit={(event) => {
                login(event);
              }}
            >
              <div className="text-box">
                <input
                  className="text-box"
                  type="email"
                  placeholder="Enter your Email-ID"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="text-box complete-center">
                <input
                  id="pass"
                  type={showPassword ? "text" : "password"}
                  className="text-box"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <i
                  type="checkbox"
                  class="fa-regular fa-eye-slash"
                  value={showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                ></i>
              </div>
              {alertData.enable && (
                <div className="text-box">
                  <Alert alertData={alertData} setAlertData={setAlertData} />
                </div>
              )}
              <div className="text-box">
                <button
                  disabled={loading}
                  className="button btn btn-primary"
                  style={{ width: "100%" }}
                >
                  {loading ? <Loading /> : <span>login</span>}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            You don't have account ?
            <button
              type="button"
              className="btn btn-link"
              data-bs-toggle="modal"
              data-bs-target="#signupModal"
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
