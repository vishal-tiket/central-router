import { NATIVE_JSI_CALLBACK } from "../constant";
import { jsiCustomEventCallback } from "../util";

export const addGenericJSIEventListener = (callback) => {
  /** Android */
  if (window?.callNativeJSI) {
    window.callNativeJSI.onmessage = callback;
    return;
  } else if (window?.generic?.callGenericNativeJSI) {
    window.addEventListener(NATIVE_JSI_CALLBACK, callback);
    return;
  }

  /** iOS */
  window.addEventListener(
    NATIVE_JSI_CALLBACK,
    jsiCustomEventCallback(callback)
  );
};

export const removeGenericJSIEventListener = (callback) => {
  /** Android */
  if (window?.callNativeJSI) {
    window.removeEventListener("message", callback);
    return;
  } else if (window?.generic?.callGenericNativeJSI) {
    window.removeEventListener(NATIVE_JSI_CALLBACK, callback);
    return;
  }

  /** iOS */
  window.removeEventListener(
    NATIVE_JSI_CALLBACK,
    jsiCustomEventCallback(callback)
  );
};
