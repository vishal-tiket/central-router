/**
 * Add generic JSI event listener
 */
export const addGenericJSIEventListener = (callback) => {
  /** Android */
  if (window.callNativeJSI) {
    console.log("added event listener for callback android");
    window.callNativeJSI.onmessage = callback;
    return;
  }

  /** iOS */
  window.addEventListener("nativeJSICallback", callback);
  console.log("added event listener for callback ios");
};

/**
 * Remove generic JSI event listener
 */
export const removeGenericJSIEventListener = (callback) => {
  if (window.callNativeJSI) {
    console.log("removed event listener for callback android");
    window.removeEventListener("message", callback);
    return;
  }

  window.removeEventListener("nativeJSICallback", callback);
  console.log("added event listener for callback ios");
};
