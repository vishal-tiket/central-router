import {
  addGenericJSIEventListener,
  removeGenericJSIEventListener,
} from "./JSIListener";
import { createRequest } from "./createRequest";

export const callGenericJSICommand = (arg) => {
  const generateRequestObj = createRequest(arg);
  console.log("generated request", generateRequestObj);
  return new Promise((resolve, reject) => {
    function eventHandler(event) {
      console.log("got the callback from native", event);
      // Remove the event listener once the event is received
      removeGenericJSIEventListener(eventHandler);
      resolve(event.detail);
    }

    // add generic jsi event listener
    addGenericJSIEventListener(eventHandler);

    // stringify the argument and pass it to jsi method.
    const jsiArg = JSON.stringify(generateRequestObj);

    /** Android */
    if (window?.callNativeJSI?.postMessage) {
      console.log("invoke jsi using callNativeJSI.postMessage");
      window.callNativeJSI.postMessage?.(jsiArg);
      return;
    } else if (window?.generic?.callGenericNativeJSI) {
      console.log("invoke jsi using generic.callGenericNativeJSI");
      window.generic.callGenericNativeJSI?.(jsiArg);
      return;
    }

    /** iOS */
    if (window?.webkit?.messageHandlers?.callNativeJSI?.postMessage) {
      window.webkit.messageHandlers.callNativeJSI.postMessage(jsiArg);
      return;
    }
  });
};
