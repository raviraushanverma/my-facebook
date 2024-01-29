import { useState } from "react";
import Logo from "./Logo";
import Alert from "./Alert";
import Loading from "./Loading";
import { useContext } from "react";
import { SessionContext } from "../providers/SessionProvider";
import { NotificationContext } from "../providers/NotificationProvider";

const Login = () => {
  const [user, setUser] = useContext(SessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertData, setAlertData] = useState({ enable: false });
  const [loading, setLoading] = useState();
  const [notification, setNotification] = useContext(NotificationContext);

  const login = async (event) => {
    event.preventDefault();
    setAlertData({ enable: false });
    const data = {
      email: email,
      password: password,
    };
    setLoading(true);
    const serverData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/login`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const response = await serverData.json();
    setLoading(false);
    setAlertData({ ...response, enable: true });
    if (response.isSuccess === true) {
      setUser(response.user);
      const notificationArray = Object.values(
        response.user.notifications
      ).reverse();
      setNotification(notificationArray);
      document.getElementById("modalCloseButton").click();
    }
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
              <div className="text-box">
                <input
                  className="text-box"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
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
