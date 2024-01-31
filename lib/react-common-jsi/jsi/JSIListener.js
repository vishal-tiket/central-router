/**
 * Add generic JSI event listener
 */
export const addGenericJSIEventListener = (callback) => {
  /** Android */
  if (window?.callNativeJSI) {
    console.log("added event listener for callback android callNativeJSI");
    window.callNativeJSI.onmessage = callback;
    return;
  } else if (window?.generic?.callGenericNativeJSI) {
    console.log(
      "added event listener for callback android callGenericNativeJSI"
    );
    window.addEventListener("nativeJSICallback", callback);
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
  if (window?.callNativeJSI) {
    console.log("removed event listener for callback android callNativeJSI");
    window.removeEventListener("message", callback);
    return;
  } else if (window?.generic?.callGenericNativeJSI) {
    console.log(
      "removed event listener for callback android callGenericNativeJSI"
    );
    window.removeEventListener("nativeJSICallback", callback);
    return;
  }

  window.removeEventListener("nativeJSICallback", callback);
  console.log("removed event listener for callback ios");
};
