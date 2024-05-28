import { useRouter } from "next/router";
import "./globals.css";
import { useEffect } from "react";

export default function Refresh() {
  const router = useRouter();

  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <>
      <button onClick={() => router.push("/en-in/reload1")}>
        Redirect to reload1
      </button>
      <button onClick={() => window.location.reload()}>Reload</button>
      <button onClick={() => router.reload()}>Router Reload</button>
      <button onClick={() => router.replace(router.asPath)}>
        Router Replace
      </button>
    </>
  );
}
