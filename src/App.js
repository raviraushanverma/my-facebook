import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import SessionProvider from "./providers/SessionProvider";
import NotificationProvider from "./providers/NotificationProvider";

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <SessionProvider>
          <Header />
          <Login />
          <SignUp />
          <div className="our-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:user_id" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </SessionProvider>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
