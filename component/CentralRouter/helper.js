import { callGenericJSI } from "@tiket/react-common-jsi";

/** get url query parameters */
export const queryParams = (searchParams) => {
  let obj = {};
  for (const [key, value] of searchParams.entries()) {
    obj[key] = value;
  }
  return obj;
};

/** check if entered url is valid or not */
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

/** navigation using window object */
export const handleJSNavigation = (isReplace = false) => {
  if (!isValidUrl(url) && isClient) {
    window.alert("Please enter a valid url");
    return;
  }
  if (isReplace) {
    window.location.replace(url);
    return;
  }
  window.location.href = url;
};

/** tracker jsi */
export const callTrackerJSI = async (setTrackerJSI) => {
  console.log("call tracker jsi");
  const response = await callGenericJSI({
    command: "trackAnalyticEvent",
    payload: {
      event: "click",
      eventCategory: "ctaClick",
      text: "promo",
    },
  });
  setTrackerJSI(JSON.stringify(response));
  console.log("received tracker jsi response", JSON.stringify(response));
};

/** authentication jsi */
export const callAuthenticationJSI = async (setAuthenticationJSI) => {
  console.log("callAuthenticationJSI jsi");
  const response = await callGenericJSI({
    command: "getAuthenticatedUserDetails",
  });
  setAuthenticationJSI(JSON.stringify(response));
  console.log(
    "received callAuthenticationJSI response",
    JSON.stringify(response)
  );
};