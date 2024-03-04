export const JSICallback = (event) => {
  const { requestId } = event?.detail?.response;
  const { resolve } = window.jsiPromise[requestId];
  delete window.jsiPromise?.[requestId];
  console.log("resolve promise");
  resolve?.(event?.detail?.response);
  return true;
};

export const callGenericJSIWithRequestId = (command, requestId) => {
  // if request id already exists then delete the old one
  console.log("callGenericJSIWithRequestId");
  console.log("callGenericJSIWithRequestId requestId", requestId);
  window.addEventListener("nativeJSICallback", JSICallback);
  window.callGenericJSI(JSON.stringify({ command, requestId }));

  return new Promise((resolve) => {
    window.jsiPromise = window.jsiPromise || {};
    window.jsiPromise[requestId] = {
      resolve,
    };
    console.log(
      "callGenericJSIWithRequestId window.jsiPromise",
      requestId,
      window.jsiPromise[requestId]
    );
  });
};
