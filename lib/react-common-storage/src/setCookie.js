import { FALLBACK_COOKIE_PREFIX } from "./constants";

export const setCookie = (key, value) => {
  const encodedCookieValue = encodeURIComponent(value);
  const cookieName = FALLBACK_COOKIE_PREFIX + key;
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  const expires = expirationDate.toUTCString();

  const cookieString = `${cookieName}=${encodedCookieValue}; domain=.tiket.com; expires=${expires}; path=/`;
  document.cookie = cookieString;
};
