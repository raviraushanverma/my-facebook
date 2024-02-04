import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "" };
  }

  componentDidCatch(error) {
    this.setState({ error: `${error.name}: ${error.message}` });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="complete-center" style={{ height: "30vh" }}>
          <div style={{ textAlign: "center" }}>
            <i
              style={{ fontSize: "50px", color: "red" }}
              className="fa-solid fa-circle-exclamation"
            ></i>
            <div>Something went wrong!</div>
            <div>{error}</div>
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
      );
    } else {
      return <>{this.props.children}</>;
    }
  }
}
