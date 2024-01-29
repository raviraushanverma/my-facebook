import banner1 from "../assets/images/chat-image.webp";
import banner2 from "../assets/images/banner2.webp";
import banner3 from "../assets/images/banner3.jpeg";
import chat from "../assets/images/chat.jpeg";
import connect from "../assets/images/connect.jpeg";
import enjoy from "../assets/images/enjoy.webp";
import Timeline from "./Timeline";
import { SessionContext } from "../providers/SessionProvider";
import { useContext } from "react";

const Home = () => {
  const [user] = useContext(SessionContext);
  if (user) {
    return <Timeline />;
  }
  return (
    <main>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1 className="display-3 fw-bold">Welcome to Apna Facebook!</h1>
          <h3 className="fw-normal text-muted mb-3">
            Lets connect with your friends today
          </h3>
          <div className="d-flex gap-3 justify-content-center lead fw-normal">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              LOGIN
            </button>
          </div>
        </div>
        <div className="product-device shadow-sm d-none d-md-block" />
        <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
      </div>
      <div className="container">
        <div className="marketing">
          <div className="row">
            <div className="col-lg-4">
              <img
                src={chat}
                className="rounded rounded-image"
                alt="Cinque Terre"
              />
              <h2 className="fw-normal">Chat</h2>
              <p>Let have chat today</p>
            </div>
            <div className="col-lg-4">
              <img
                src={connect}
                className="rounded rounded-image"
                alt="Cinque Terre"
              />
              <h2 className="fw-normal">connect</h2>
              <p>Let connect with your friends</p>
            </div>
            <div className="col-lg-4">
              <img
                src={enjoy}
                className="rounded rounded-image"
                alt="Cinque Terre"
              />
              <h2 className="fw-normal">Enjoy</h2>
              <p>Let have fun today</p>
            </div>
          </div>
          <hr className="featurette-divider" />
          <div className="row featurette">
            <div className="col-md-6">
              <h2 className="featurette-heading fw-normal lh-1">
                Word is too small,{" "}
                <span className="text-body-secondary">
                  Don't your Waste your time now. Let have fun Today with your
                  friends
                </span>
              </h2>
            </div>
            <div className="col-md-6">
              <img className="banner" src={banner1} alt="banner1"></img>
            </div>
          </div>
          <hr className="featurette-divider" />
          <div className="row featurette">
            <div className="col-md-6">
              <img className="banner" src={banner2} alt="banner2"></img>
            </div>
            <div className="col-md-6">
              <h2 className="featurette-heading fw-normal lh-1">
                The task at hand is a bit trivial;
                <span className="text-body-secondary">
                  save your time. Let's make today memorable by having a great
                  time with your friends!
                </span>
              </h2>
            </div>
          </div>
          <hr className="featurette-divider" />
          <div className="row featurette">
            <div className="col-md-6">
              <h2 className="featurette-heading fw-normal lh-1">
                Words seem too minuscule for now;
                <span className="text-body-secondary">
                  don't invest your time there. Let's seize the day and enjoy
                  some quality moments with your friends!
                </span>
              </h2>
            </div>
            <div className="col-md-6">
              <img className="banner" src={banner3} alt="banner3"></img>
            </div>
          </div>
          <hr className="featurette-divider" />
        </div>
      </div>
    </main>
  );
};

export default Home;
