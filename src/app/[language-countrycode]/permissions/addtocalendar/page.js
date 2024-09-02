"use client";
import { addToCalendar } from "@tiket/react-common-navigator-permission";
import "./../style.css";
import { useEffect, useState } from "react";

const CARMapping = {
  android: {
    "add-to-calendar": {
      id: "id",
      title: "title",
      description: "description",
      startTime: "beginTime",
      endTime: "endTime",
      isAllDay: "allDay",
      remindIn: "allowedReminders",
      location: "eventLocation",
      organizer: "organizer",
    },
  },
  ios: {
    "add-to-calendar": {
      title: "title",
      description: "notes",
      startTime: "startDate",
      endTime: "endDate",
      isAllDay: "isAllDay",
      remindIn: "alarm",
      location: "structuredLocation",
    },
  },
  web: {
    "add-to-calendar": {
      title: "text",
      description: "details",
      dates: "dates",
      isAllDay: "isAllDay",
      location: "location",
    },
  },
};

export default function AddEventToCalendar() {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbar = () => {
    setShowSnackBar(true);
    setTimeout(() => {
      setShowSnackBar(false);
      setSnackbarMessage("");
    }, 4000);
  };

  const addCalendarEvent = async (event) => {
    console.log("add-to-calendar entry point");
    try {
      window.CARProperties = CARMapping;
      console.log("add-to-calendar try block");
      const res = await addToCalendar(event);
      console.log("add-to-calendar promise resolved", res);
      setSnackbarMessage(res?.data?.message || "Event added to calendar");
      handleSnackbar();
    } catch (e) {
      console.log("add-to-calendar promise rejected", e);
      setSnackbarMessage(
        e?.error?.message || "Failed to add event to calendar"
      );
      handleSnackbar();
    }
  };

  useEffect(() => {
    window.addToCalendar = addCalendarEvent;
  }, []);

  return (
    <>
      <h3>Add Events To Calendar</h3>
      <div className={showSnackBar ? `snackbar show` : `snackbar`}>
        {snackbarMessage}
      </div>
    </>
  );
}
