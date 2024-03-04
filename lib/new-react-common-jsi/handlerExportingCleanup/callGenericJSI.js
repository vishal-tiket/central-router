// create unique id using Date getTime method
const uniqueId = () => {
  return "jsi-request-" + String(new Date().getTime());
};

const JSICallback = (e) => {
  const { requestId } = e?.detail?.response;
  const { resolve } = window.jsiPromise[requestId];
  delete window.jsiPromise?.[requestId];
  resolve?.(e.detail.response);
  return true;
};

export const callGenericJSI = (command) => {
  // Call window.callGenericJSI
  const requestId = uniqueId();
  window.callGenericJSI(JSON.stringify({ command, requestId }));

  // Set up event listener
  if (typeof window.addEventListener === "function") {
    window.addEventListener("nativeJSICallback", JSICallback);
  }

  return new Promise((resolve) => {
    window.jsiPromise = window.jsiPromise || {};
    window.jsiPromise[uniqueId] = {
      resolve,
    };
  });
};

export const clearGenericJSI = () => {
  window.removeEventListener("nativeJSICallback", JSICallback);
};
