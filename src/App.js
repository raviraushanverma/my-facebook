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

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <NotificationProvider>
          <Header />
          <Login />
          <SignUp />
          <div className="our-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:user_id" element={<Profile />} />
              <Route path="/notifications" element={<NotificationPage />} />
            </Routes>
          </div>
          <Footer />
        </NotificationProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
