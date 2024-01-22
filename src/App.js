import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";

function App(props) {
  return (
    <BrowserRouter>
      <Header />
      <div>hello</div>
      <Login />
      <SignUp />
      <div className="our-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:user_id" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
