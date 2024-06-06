"use client";
import { useEffect } from "react";

export default function HardRedirect({ params }) {
  useEffect(() => {
    window.location.href = `/hotel`;
  }, []);
  return <></>;
}
