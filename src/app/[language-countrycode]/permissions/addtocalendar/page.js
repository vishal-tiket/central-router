"use client";
import { addToCalendar } from "@tiket/react-common-navigator-permission";
import "./../style.css";
import { useState } from "react";

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

const defaultEventDetails = {
  title: "Meeting",
  description: "Meeting with Vishal",
  startTime: 1733034600000,
  endTime: 1733041800000,
  location: {
    name: "Office",
    latitude: 37.7749,
    longitude: -122.4194,
  },
  isAllDay: false,
  organizer: "vishal.kamra@tiket.com",
  id: "123456",
  remindIn: 600,
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

  const addCalendarEvent = async () => {
    console.log("add-to-calendar entry point");
    try {
      window.CARProperties = CARMapping;
      console.log("add-to-calendar try block");
      const res = await addToCalendar(defaultEventDetails);
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

  const addAllDayCalendarEvent = async () => {
    console.log("add-to-calendar entry point");
    try {
      window.CARProperties = CARMapping;
      console.log("add-to-calendar try block");
      const res = await addToCalendar({
        ...defaultEventDetails,
        isAllDay: true,
      });
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

  const failedToAddEvent = async (e) => {
    console.log("add-to-calendar entry point");
    try {
      window.CARProperties = CARMapping;
      console.log("add-to-calendar try block");
      const res = await addToCalendar({
        ...defaultEventDetails,
        startTime: undefined,
      });
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

  return (
    <>
      <h3>Add Events To Calendar</h3>
      <button onClick={addCalendarEvent}>Add to calendar</button>
      <button onClick={addAllDayCalendarEvent}>Add to calendar All Day</button>
      <button onClick={failedToAddEvent}>
        Failed to add event (only for ios)
      </button>
      <span
        style={{
          color: "black",
          textAlign: "center",
          padding: "5px 0",
          display: "block",
        }}
      >
        Trying to pass undefined start date to fail the calendar event
      </span>
      <div className={showSnackBar ? `snackbar show` : `snackbar`}>
        {snackbarMessage}
      </div>
    </>
  );
}
