"use client";
import { onJSRouting } from "@tiket/react-common-jsi";
import Link from "next/link";

export default function GenericJSI() {
  return (
    <>
      <Link
        onClick={() =>
          onJSRouting({
            url: `${window.location.origin}/onpagerendered`,
          })
        }
        href="/onpagerendered"
        style={{ display: "block" }}
      >
        next js router
      </Link>

      <a
        onClick={() =>
          onJSRouting({
            url: `${window.location.origin}/onpagerendered`,
          })
        }
        href="/onpagerendered"
        style={{ display: "block" }}
      >
        normal router
      </a>
    </>
  );
}
