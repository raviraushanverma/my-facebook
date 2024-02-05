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
import VideoChat from "./components/VideoChat";

function App() {
  return (
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
                    <Route path="/video-chat" element={<VideoChat />} />
                  </Routes>
                </div>
                <Footer />
              </NotificationProvider>
            </FriendSuggestionProvider>
          </PostProvider>
        </EventSourceProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
