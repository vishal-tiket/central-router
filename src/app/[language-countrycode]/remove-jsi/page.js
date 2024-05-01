"use client";
import AddToCalendarButton from "add-to-calendar-button";

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
          window.open("geo:37.7749,-122.4194");
        }}
      >
        Open Map
      </button>

      <AddToCalendarButton
        name="[Reminder] Test the Add to Calendar Button"
        startDate="2024-05-05"
        startTime="10:15"
        endTime="23:30"
        timeZone="America/Los_Angeles"
        location="World Wide Web"
        description="Check out the maybe easiest way to include Add to Calendar Buttons to your web projects:[br]→ [url]https://add-to-calendar-button.com/|Click here![/url]"
        options="'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
        lightMode="bodyScheme"
      />
    </div>
  );
}
