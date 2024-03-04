import { sampleJSI } from "./sample";

export const setupMockJSI = () => {
  window.callGenericJSI = async (arg) => {
    const { command, requestId } = JSON.parse(arg);
    let response = await sampleJSI[command]();
    response = JSON.parse(response);
    console.log("JSI response", response);
    // dispatch custom event 'nativeJSICallback' with response
    if (requestId) {
      response = { ...response, requestId };
    }
    window.dispatchEvent(
      new CustomEvent("nativeJSICallback", {
        detail: { response: response },
      })
    );
  };
};
