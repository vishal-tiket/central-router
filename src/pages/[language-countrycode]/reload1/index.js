import { useRouter } from "next/router";
import "./globals.css";

export default function Refresh() {
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.push("/en-in/reload2")}>
        Redirect to reload2
      </button>
      <button onClick={() => window.location.reload()}>Reload</button>
      <button onClick={() => router.reload()}>Router Reload</button>
      <button onClick={() => router.replace(router.asPath)}>
        Router Replace
      </button>
    </>
  );
}
