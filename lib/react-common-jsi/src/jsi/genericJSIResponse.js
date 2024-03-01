import { resolvePromise } from "../util";
import { invokeJSI } from "./invokeJSI";
import {
  addGenericJSIEventListener,
  removeGenericJSIEventListener,
} from "./jsiListener";

export const jsiResponseHandler = (event, request, resolve) => {
  const { data, detail } = event || /* istanbul ignore next */ {};
  const { command: dataResponseCommand } =
    data || /* istanbul ignore next */ {};
  const { command: detailResponseCommand } =
    detail || /* istanbul ignore next */ {};

  console.log(
    "jsiResponseHandler",
    event,
    JSON.stringify(event),
    JSON.stringify(request)
  );
  const { command } = request || /* istanbul ignore next */ {};
  const { callNativeJSI, generic } = window || /* istanbul ignore next */ {};
  const { callGenericNativeJSI } = generic || /* istanbul ignore next */ {};

  if (
    (callNativeJSI && command === dataResponseCommand) ||
    command === detailResponseCommand
  ) {
    // remove the event listener after getting response of generic jsi
    removeGenericJSIEventListener(jsiResponseHandler);

    /** Android */
    if (callNativeJSI) {
      return resolvePromise(data, resolve);
    } else if (callGenericNativeJSI) {
      return resolvePromise(detail, resolve);
    } else {
      /** iOS */
      return resolvePromise(detail, resolve);
    }
  }
};

export const jsiPromise = (arg, payload) => {
  return new Promise((resolve, reject) => {
    try {
      // add event listener to capture the generic jsi event, dispatched from native.
      addGenericJSIEventListener((e) => jsiResponseHandler(e, arg, resolve));

      // invoke jsi with stringified version of request payload
      invokeJSI(payload);
    } catch (e) {
      return reject({ error: e });
    }
  });
};
