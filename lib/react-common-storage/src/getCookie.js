import { FALLBACK_COOKIE_PREFIX } from "./constants";

export const getCookie = (key) => {
  const cookieName = `${FALLBACK_COOKIE_PREFIX}${key}`;
  const value = document.cookie
    .match("(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)")
    ?.pop();
  return value ? decodeURIComponent(value) : undefined;
};
