import { useEffect } from "react";

const Alert = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setAlertData({ enable: false });
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [props]);

  if (!props.alertData.enable) {
    return <div></div>;
  }
  const alertClass = props.alertData.isSuccess
    ? "alert-success"
    : "alert-danger";

  return (
    <div
      className={`alert ${alertClass} alert-dismissible fade show`}
      role="alert"
    >
      <strong>{props.alertData.message}</strong>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
