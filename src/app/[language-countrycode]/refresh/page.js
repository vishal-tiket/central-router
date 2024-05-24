"use client";
import { useRouter } from "next/navigation";

export default function Refresh() {
  const router = useRouter();
  return (
    <>
      <button onClick={() => window.location.reload()}>Reload</button>
      <button onClick={() => router.refresh()}>Router Refresh</button>
    </>
  );
}
