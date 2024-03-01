/**
 * Helper to type-cast JSI callback argument.
 * Event from JSI is actually a CustomEvent with the key from WindowEventMap,
 * but to avoid overriding the WindowEventMap, this type-cast is being used.
 */
export const sanitizeJSICallbackArg = (ev) => {
  const maybeCustomEvent = ev;

  if (maybeCustomEvent.detail) {
    return maybeCustomEvent;
  }
};

export const jsiCustomEventCallback = (callback) => (ev) => {
  const jsiCallback = sanitizeJSICallbackArg(ev);

  if (!jsiCallback) {
    console.log("JSI callback response is not a valid custom event callback!");
    return;
  }

  callback(jsiCallback);
};

export const jsonParse = (data) => {
  try {
    if (!data) return undefined;

    return JSON.parse(data);
  } catch (e) {
    return undefined;
  }
};

export const resolvePromise = (data, resolve) => {
  if (!data) return resolve({});
  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (error) {
    // If parsing fails, treat the data as not JSON
    return resolve(data);
  }
  return resolve(jsonData);
};
