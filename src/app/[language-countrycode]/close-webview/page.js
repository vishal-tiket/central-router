"use client";

export default function Page() {
  return (
    <button
      onClick={() =>
        typeof window !== "undefined" &&
        window.history.go(-(window.history.length - 1))
      }
    >
      Close Webview
    </button>
  );
}
