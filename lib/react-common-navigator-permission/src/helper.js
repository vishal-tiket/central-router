import {
  ANDROID_DEVICE_TYPE,
  DEVICE_TYPE_COOKIE,
  IOS_DEVICE_TYPE,
} from "./constant";

export const getCookieByName = (cookieName) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

export const isWebview = () => {
  const deviceType = getCookieByName(DEVICE_TYPE_COOKIE);
  return deviceType === ANDROID_DEVICE_TYPE || deviceType === IOS_DEVICE_TYPE;
};
