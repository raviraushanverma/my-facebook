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
import ActiveChatFriendProvider from "./providers/ActiveChatFriendProvider";
import WebsocketProvider from "./providers/WebsocketProvider";
import ActiveChatMessageProvider from "./providers/ActiveChatMessageProvider";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <EventSourceProvider>
          <PostProvider>
            <FriendSuggestionProvider>
              <NotificationProvider>
                <ActiveChatFriendProvider>
                  <WebsocketProvider>
                    <ActiveChatMessageProvider>
                      <Header />
                      <Login />
                      <SignUp />
                      <div className="our-container">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route
                            path="/profile/:user_id"
                            element={<Profile />}
                          />
                          <Route
                            path="/post/:post_id"
                            element={<PostDetail />}
                          />
                          <Route
                            path="/notifications"
                            element={<NotificationPage />}
                          />
                          <Route path="/video-chat" element={<VideoChat />} />
                        </Routes>
                        <ChatBox />
                      </div>
                    </ActiveChatMessageProvider>
                    <Footer />
                  </WebsocketProvider>
                </ActiveChatFriendProvider>
              </NotificationProvider>
            </FriendSuggestionProvider>
          </PostProvider>
        </EventSourceProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
