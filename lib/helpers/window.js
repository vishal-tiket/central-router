// abstraction of window because "window?." doesn't solve "ReferenceError: window is not defined"
// https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
export const safeWindow = () => {
  if (typeof window === "undefined") return undefined;

  return window;
};
