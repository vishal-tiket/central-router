export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:Meeting
DESCRIPTION:Meeting with John
LOCATION:Office
END:VEVENT
END:VCALENDAR`;

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": `attachment; filename="meeting.ics"`,
    },
  });
}
