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
  // Regular expression pattern for URL validation
  var pattern =
    /^(https?|router):\/\/([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[a-zA-Z0-9_\-/.]*)*(\?[a-zA-Z0-9_,&=-]*)?$/;

  if (!pattern.test(string)) {
    return false;
  }

  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

/** navigation using window object */
export const handleJSNavigation = (url, isReplace = false) => {
  if (!isValidUrl(url)) {
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
export const callTrackerJSI = async (setTrackerJSI, callGenericJSI) => {
  try {
    console.log("call tracker jsi");
    const response = await callGenericJSI({
      event: "click",
      eventCategory: "ctaClick",
      text: "promo",
    });
    setTrackerJSI(JSON.stringify(response));
  } catch (e) {
    console.log("error in callTrackerJSI", e, JSON.stringify(e));
    setTrackerJSI(JSON.stringify(e));
  }
};

/** authentication jsi */
export const callAuthenticationJSI = async (
  setAuthenticationJSI,
  callGenericJSI
) => {
  try {
    console.log("callAuthenticationJSI jsi");
    const response = await callGenericJSI();
    setAuthenticationJSI(JSON.stringify(response));
  } catch (e) {
    console.log(
      "received callAuthenticationJSI response",
      JSON.stringify(response)
    );
    setAuthenticationJSI(JSON.stringify(e));
  }
};
