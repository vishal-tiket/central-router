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

      // Resolve the promise with the value received from the event
      // const parsedJSON = JSON.parse(event?.detail);
      // console.log("response from jsi", parsedJSON);
      resolve(JSON.stringify(event));
    }

    // add generic jsi event listener
    addGenericJSIEventListener(eventHandler);

    // stringify the argument and pass it to jsi method.
    const jsiArg = JSON.stringify(generateRequestObj);
    /** Android */
    if (window?.callNativeJSI?.postMessage) {
      window?.callNativeJSI?.postMessage?.(jsiArg);
      return;
    }
    /** iOS */
    if (window?.webkit?.messageHandlers?.callNativeJSI?.postMessage) {
      window.webkit.messageHandlers.callNativeJSI.postMessage(jsiArg);
      return;
    }
  });
};
