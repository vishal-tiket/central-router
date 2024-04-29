"use client";

export default function RemoveJSI() {
  return (
    <div>
      <button onClick={() => (window.location.href = `tel:+91 9999999999`)}>
        Open phone Phone dialer with phone number entered
      </button>

      <button onClick={() => navigator.share("https://www.tiket.com")}>
        Share text
      </button>

      <button
        onClick={() => {
          try {
            window.open(
              "intent:/path/to/your/file.pdf#Intent;action=android.intent.action.VIEW;type=application/pdf;end"
            );
          } catch (e) {
            window.open("/path/to/your/file.pdf");
          }
        }}
      >
        Open Pdf Viewer
      </button>

      <button onClick={() => window.open("geo:37.7749,-122.4194")}>
        Open Map
      </button>

      <button
        onClick={() => {
          try {
            window.open(
              "intent://add_event#Intent;scheme=com.android.calendar;end"
            );
          } catch (e) {
            window.open("calshow://");
          }
        }}
      >
        Open Calendar and add event
      </button>
    </div>
  );
}
