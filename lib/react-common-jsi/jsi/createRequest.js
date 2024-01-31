export const createRequest = (arg) => {
  const command = arg?.request || "";
  const data = arg?.payload || {};
  switch (command) {
    case "trackAnalyticEvent":
      return {
        command: "trackAnalyticEvent",
        request: {
          name: data?.event,
          json: data,
        },
      };
    case "getAuthenticatedUserDetails":
      return {
        command: "getAuthenticatedUserDetails",
      };
    default:
      return {
        command: "",
      };
  }
};
