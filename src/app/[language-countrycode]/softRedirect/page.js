import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SoftRedirect({ params }) {
  const router = useRouter();
  useEffect(() => {
    router.push(`/hotel`);
  }, []);
  return <></>;
}
