"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";

export const CustomLink = (props) => {
  const { setReferrer } = useContext(Context);
  const { children } = props;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // workaround for referrer using app router since next js 14 does not support router events yet.
  const handleReferrerForAppRouter = () => {
    if (isClient) {
      const currentUrl = window.location.href || "null";
      setReferrer(currentUrl);
    }
  };

  return (
    <Link {...props} onClick={handleReferrerForAppRouter}>
      {children}
    </Link>
  );
};
