export const sampleJSI = {
  sampleJSI0: () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("JSI 0 ms");
        return resolve(
          JSON.stringify({ command: "sampleJSI0", payload: "JSI 0 ms" })
        );
      }, 0)
    );
  },
  sampleJSI50: () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("JSI 50 ms");
        return resolve(
          JSON.stringify({ command: "sampleJSI50", payload: "JSI 50 ms" })
        );
      }, 50)
    );
  },

  sampleJSI200: () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("JSI 200 ms");
        return resolve(
          JSON.stringify({ command: "sampleJSI200", payload: "JSI 200 ms" })
        );
      }, 200)
    );
  },

  sampleJSI500: () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("JSI 500 ms");
        return resolve(
          JSON.stringify({ command: "sampleJSI500", payload: "JSI 500 ms" })
        );
      }, 500)
    );
  },

  sampleJSI1000: () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("JSI 1000 ms");
        return resolve(
          JSON.stringify({
            command: "sampleJSI1000",
            payload: "JSI 1000 ms",
          })
        );
      }, 1000)
    );
  },
};
