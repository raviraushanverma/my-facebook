import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: { message: "", stack: "" },
    info: { componentStack: "" },
  };

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    console.log("ErrorBoundary info ", info, error);

    return hasError ? (
      <div className="complete-center" style={{ height: "30vh" }}>
        <div style={{ textAlign: "center" }}>
          <i
            style={{ fontSize: "50px", color: "red" }}
            className="fa-solid fa-circle-exclamation"
          ></i>
          <div>Something went wrong!</div>
          <div>{`${JSON.stringify(error)}`}</div>
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
    ) : (
      children
    );
  }
}
