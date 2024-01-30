import { CARWebview } from "../car-webview";

export const carCallback = (event) => {
  // format the contact picker data.
  return {};
};

export const WebviewConatctPicker = (req) => {
  return CARWebview({ req, carRequestType: "contact-picker", carCallback });
};
