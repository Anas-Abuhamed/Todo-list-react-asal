import { useEffect } from "react";
import Button from "../global/Button";
import Loader from "../global/Loader";

const Popup = ({ message, setMessagePopup, showAlert, loading }) => {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") handleCancel();
      if (e.key === "Enter") handleConfirm();
    }
    //
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };

  }, []);
  function handleConfirm() {
    message.onConfirm();
    setMessagePopup({ text: null, onConfirm: null, onCancel: null });
  }
  function handleCancel() {
    message.onCancel();
    setMessagePopup({ text: null, onConfirm: null, onCancel: null });
  }
  return (
    <>
      {loading && <div className="popup"><Loader /></div>}
      {!loading && showAlert && <div className="popup">
        <div className="alert">
          <p>Please add a task.</p></div>
      </div>}
      {!loading && !showAlert &&
        <div className="popup" onBlur={handleCancel} onKeyDown={handleConfirm}>
          <div className="popup-overlay">
            <div className="popup-content">
              <p>{message.text}</p>
              <Button className="cancel btn" onClick={handleCancel}>Cancel</Button>
              <Button className="confirm btn" onClick={handleConfirm} autoFocus={true}>Confirm</Button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Popup