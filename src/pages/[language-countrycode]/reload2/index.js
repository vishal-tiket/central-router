import { useRouter } from "next/router";
import "./globals.css";

export default function Refresh() {
  const router = useRouter();

  return (
    <>
      <button onClick={() => window.location.reload()}>Reload</button>
      <button onClick={() => router.reload()}>Router Reload</button>
      <button onClick={() => router.replace(router.asPath)}>
        Router Replace
      </button>
      <button onClick={() => history.back(-2)}>History Back</button>
    </>
  );
}
