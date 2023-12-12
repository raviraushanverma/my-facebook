import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ImageViewer from "./components/ImageViewer";

function App(props) {
  return (
    <BrowserRouter>
      <Header />
      <Login />
      <SignUp />
      <div className="our-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo" photo={<ImageViewer />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
