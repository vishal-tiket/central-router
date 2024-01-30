import { isWebview } from "../helper";
import { WebviewConatctPicker } from "./webview";

export const ContactPicker = {
  get: function (req) {
    if (isWebview()) {
      return WebviewConatctPicker(req);
    } else {
      // handle mweb/dweb case
    }
  },
};
