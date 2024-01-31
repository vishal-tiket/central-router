/**
 * Add generic JSI event listener
 */
export const addGenericJSIEventListener = (callback) => {
  /** Android */
  if (window?.generic?.callGenericNativeJSI) {
    console.log("added event listener for callback android");
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
  if (window?.generic?.callGenericNativeJSI) {
    console.log("removed event listener for callback android");
    window.removeEventListener("nativeJSICallback", callback);
    return;
  }

  window.removeEventListener("nativeJSICallback", callback);
  console.log("removed event listener for callback ios");
};
