import {
  GENERIC_GET_AUTHENTICATED_USER_DETAILS,
  GENERIC_TRACK_ANALYTIC_EVENT,
} from "../constant";

export const createRequestPayloadForGenericJSI = (arg) => {
  const command = arg?.command || "";
  const data = arg?.payload || {};

  switch (command) {
    case GENERIC_TRACK_ANALYTIC_EVENT:
      return {
        command: GENERIC_TRACK_ANALYTIC_EVENT,
        request: {
          name: data?.event || "",
          json: data || {},
        },
      };

    case GENERIC_GET_AUTHENTICATED_USER_DETAILS:
      return {
        command: GENERIC_GET_AUTHENTICATED_USER_DETAILS,
      };

    default:
      return {
        command: "",
      };
  }
};
