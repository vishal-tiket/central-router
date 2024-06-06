"use client";
import { onNavigationStart } from "@tiket/react-common-jsi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SoftRedirect({ params }) {
  const router = useRouter();
  useEffect(() => {
    onNavigationStart({ url: "/hotel" });
    router.push(`/hotel`);
  }, []);
  return <></>;
}
