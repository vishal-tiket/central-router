import { NO_RESPONSE_REQUIRED_JSI } from "../constant";
import { createRequestPayloadForGenericJSI } from "./createRequestPayload";
import { jsiPromise } from "./genericJSIResponse";
import { invokeJSI } from "./invokeJSI";

export const callGenericJSI = (arg) => {
  if (typeof window !== "undefined") {
    try {
      // create the request payload from the argument passed by consumer.
      const jsiRequestPayload = createRequestPayloadForGenericJSI(arg);
      const stringifiedRequestPayload = JSON.stringify(jsiRequestPayload);

      console.log("JSI request payload", stringifiedRequestPayload);

      // Promise for JSI that require response in return
      return jsiPromise(arg, stringifiedRequestPayload);
    } catch (e) {
      console.log("Generic jsi call failed", e);
      return;
    }
  }
};
