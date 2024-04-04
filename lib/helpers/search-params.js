/**
 * Construct URL Search Params String to Object
 *
 *
 * @example
 *
 * const params = "sortBy=expiry&utm_source=sms&utm_page=gvReminder";
 * const searchParamsObj = constructUrlSearchParamsStringToObject(params);
 * console.log(searchParamsObj); // { "sortBy": "expiry", "utm_source": "sms", "utm_page": "gvReminder" }
 */
export const constructUrlSearchParamsStringToObject = (str) => {
  const urlSearchParams = new URLSearchParams(str);
  const entries = urlSearchParams.entries();

  const result = {};

  let key;
  let value;

  for ([key, value] of entries) {
    result[key] = value;
  }
  return result;
};

/**
 * Construct Object to URL Search Params String
 *
 *
 * @example
 *
 * const params = { "sortBy": "expiry", "utm_source": "sms", "utm_page": "gvReminder" };
 * const searchParamsStr = constructUrlSearchParamsObjectToString(params);
 * console.log(searchParamsStr); // "sortBy=expiry&utm_source=sms&utm_page=gvReminder"
 */
export const constructUrlSearchParamsObjectToString = (obj) => {
  const convertedToString = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value.toString()])
  );

  return new URLSearchParams(convertedToString).toString();
};
