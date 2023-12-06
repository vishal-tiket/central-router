export const isIFrame = (input) => !!input && input.tagName === "IFRAME";

export const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
