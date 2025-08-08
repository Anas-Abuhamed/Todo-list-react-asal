export default function Popup({ message, setMessagePopup }) {
  function handleConfirm() {
    message.onConfirm();
    setMessagePopup({ text: null, onConfirm: null, onCancel: null });
  }
  function handleCancel() {
    message.onCancel();
    setMessagePopup({ text: null, onConfirm: null, onCancel: null });
  }
  return (
    <div className="popup">
      <div className="popup-overlay">
        <div className="popup-content">
          <p>{message.text}</p>
          <button className="cancel btn" onClick={handleCancel}>Cancel</button>
          <button className="confirm btn" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}