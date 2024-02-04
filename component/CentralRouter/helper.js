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
