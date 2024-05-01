"use client";

export default function RemoveJSI() {
  function createCalendarEventURL(event) {
    const { title, startDate, endDate, location, description } = event;
    const icsContent = `
    BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:${title}
    DTSTART:${new Date(startDate).toISOString().replace(/-|:|\.\d+/g, "")}
    DTEND:${new Date(endDate).toISOString().replace(/-|:|\.\d+/g, "")}
    LOCATION:${location}
    DESCRIPTION:${description}
    END:VEVENT
    END:VCALENDAR`;

    const base64Encoded = btoa(icsContent);
    return `data:text/calendar;charset=utf8;base64,${base64Encoded}`;
  }
  function AddToCalendarButton({ event }) {
    const calendarEventURL = createCalendarEventURL(event);

    return (
      <a href={calendarEventURL} download={`${event.title}.ics`}>
        Add to Calendar
      </a>
    );
  }

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

      <AddToCalendarButton />
    </div>
  );
}
