"use client";

export default function RemoveJSI() {
  function createICSFile(event) {
    // Create the iCalendar file content
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${new Date(event.startDate).toISOString().replace(/-|:|\.\d+/g, "")}
DTEND:${new Date(event.endDate).toISOString().replace(/-|:|\.\d+/g, "")}
LOCATION:${event.location}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR
`;

    // Create a Blob from the iCalendar content
    const blob = new Blob([icsContent], { type: "text/calendar" });
    return URL.createObjectURL(blob);
  }

  function AddToCalendarButton({ event }) {
    // Generate the download URL for the .ics file
    const icsFileURL = createICSFile(event);

    return (
      <a href={icsFileURL} download={`${event.title}.ics`}>
        Add to Calendar
      </a>
    );
  }

  const event = {
    title: "My Event",
    startDate: "2024-05-01T10:00:00",
    endDate: "2024-05-01T11:00:00",
    location: "123 Main St",
    description: "An important event",
  };

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

      <AddToCalendarButton event={event} />
    </div>
  );
}
