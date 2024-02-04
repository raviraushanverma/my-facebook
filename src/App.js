import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import SessionProvider from "./providers/SessionProvider";
import NotificationProvider from "./providers/NotificationProvider";
import NotificationPage from "./components/NotificationPage";
import EventSourceProvider from "./providers/EventSourceProvider";
import PostProvider from "./providers/PostProvider";
import FriendSuggestionProvider from "./providers/FriendSuggestionProvider";
import PostDetail from "./components/PostDetail";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SessionProvider>
          <EventSourceProvider>
            <PostProvider>
              <FriendSuggestionProvider>
                <NotificationProvider>
                  <Header />
                  <Login />
                  <SignUp />
                  <div className="our-container">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/profile/:user_id" element={<Profile />} />
                      <Route path="/post/:post_id" element={<PostDetail />} />
                      <Route
                        path="/notifications"
                        element={<NotificationPage />}
                      />
                    </Routes>
                  </div>
                  <Footer />
                </NotificationProvider>
              </FriendSuggestionProvider>
            </PostProvider>
          </EventSourceProvider>
        </SessionProvider>
        <button
          style={{ visibility: "hidden" }}
          id="errorModalButton"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#errorModal"
        ></button>
        <div
          className="modal fade"
          id="errorModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Something went wrong!
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="complete-center" style={{ height: "30vh" }}>
                  <div style={{ textAlign: "center" }}>
                    <i
                      style={{ fontSize: "50px", color: "red" }}
                      className="fa-solid fa-circle-exclamation"
                    ></i>
                    <div>Something went wrong!</div>
                    <div style={{ margin: "20px" }}>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                      >
                        Clear the cache and relogin!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
