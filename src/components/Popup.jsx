  import { useEffect } from "react";

  export default function Popup({ message, setMessagePopup }) {
    useEffect(() => {
      function handleKey(e) {
        if (e.key === "Escape") handleCancel();
        if (e.key === "Enter") handleConfirm();
      }

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
      <div className="popup" onBlur={handleCancel}>
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{message.text}</p>
            <button className="cancel btn" onClick={handleCancel}>Cancel</button>
            <button className="confirm btn" onClick={handleConfirm} autoFocus>Confirm</button>
          </div>
        </div>
      </div>
    )
  }