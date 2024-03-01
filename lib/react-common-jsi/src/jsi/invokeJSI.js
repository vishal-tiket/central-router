export const invokeJSI = (requestPayload) => {
  /** Android */
  if (window?.callNativeJSI?.postMessage) {
    window.callNativeJSI.postMessage?.(requestPayload);
    return;
  } else if (window?.generic?.callGenericNativeJSI) {
    window.generic.callGenericNativeJSI?.(requestPayload);
    return;
  }

  /** iOS */
  if (window?.webkit?.messageHandlers?.callNativeJSI?.postMessage) {
    window.webkit.messageHandlers.callNativeJSI.postMessage(requestPayload);
    return;
  } else if (
    window?.webkit?.messageHandlers?.callGenericNativeJSI?.postMessage
  ) {
    window.webkit.messageHandlers.callGenericNativeJSI.postMessage(
      requestPayload
    );
    return;
  }
};
