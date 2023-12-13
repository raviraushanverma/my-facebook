import { useState } from "react";
import Logo from "./Logo";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertData, setAlertData] = useState({ enable: false });

  const login = async (event) => {
    event.preventDefault();
    setAlertData({ enable: false });
    const data = {
      email: email,
      password: password,
    };
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
    setAlertData({ ...response, enable: true });
    if (response.isSuccess === true) {
      localStorage.setItem("user", JSON.stringify(response.user));
      document.getElementById("modalCloseButton").click();
      navigate(0);
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
              <div className="text-box display-flex">
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
              <div className="text-box display-flex">
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
              <div className="text-box display-flex">
                <button
                  className="button btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Login
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
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
