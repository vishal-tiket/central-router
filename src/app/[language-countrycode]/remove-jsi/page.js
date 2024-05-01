"use client";

export default function RemoveJSI() {
  return (
    <div>
      <button
        onClick={() => {
          window.location.href = `tel:+91 9999999999`;
        }}
      >
        Open phone Phone dialer with phone number entered
      </button>

      <button
        onClick={async () => {
          const shareData = {
            title: "MDN",
            text: "Learn web development on MDN!",
            url: "https://developer.mozilla.org",
          };
          try {
            await navigator.share(shareData);
            alert("MDN shared successfully");
          } catch (err) {
            alert(`Error: ${err}`);
          }
        }}
      >
        Share text
      </button>

      <button
        onClick={() => {
          window.location.href = "file:///dummy.pdf";
        }}
      >
        Open Pdf Viewer
      </button>

      <button
        onClick={() => {
          window.location.href =
            "maps://maps.google.com/maps?daddr=29.1492,75.7217";
        }}
      >
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
