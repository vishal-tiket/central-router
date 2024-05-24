"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Refresh() {
  const router = useRouter();
  const [loading, setIsLoading] = useState({ bool: true, key: 0 });

  useEffect(() => {
    setIsLoading(false);
  }, [loading.key]);

  if (loading.bool) {
    return <h2>Loading</h2>;
  }

  return (
    <>
      <button onClick={() => window.location.reload()}>Reload</button>
      <button
        onClick={() => {
          setIsLoading({
            bool: true,
            key: loading.key + 1,
          });
          router.refresh();
        }}
      >
        Router Refresh
      </button>
    </>
  );
}
