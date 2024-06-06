"use client";
import { onNavigationStart } from "@tiket/react-common-jsi";
import Link from "next/link";

export default function GenericJSI() {
  return (
    <>
      <Link
        onClick={() => {
          onNavigationStart({ url: "/onpagerendered" });
        }}
        href="/onpagerendered"
        style={{ display: "block" }}
      >
        next js router
      </Link>

      <a href="/onpagerendered" style={{ display: "block" }}>
        normal router
      </a>
    </>
  );
}
