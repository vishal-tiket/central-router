import { v4 as uuidv4 } from "uuid";

const serverSideEndpoint = process.env.SERVER_SIDE_SERVICE_ENDPOINT;

export const serviceToServiceMandatoryHeaders = ({
  username = "GUEST",
} = {}) => ({
  "X-Request-Id": uuidv4(),
  "X-Service-Id": "gateway",
  "X-Store-Id": "TIKETCOM",
  "X-Username": username,
  "X-Channel-Id": "DESKTOP",
});

/**
 * Function to inject mandatory headers to service to service requests which bypasses gateway.
 * E.g. https://lb1-testing.tiket.com/tix-member-session/v1/session/validate.
 * For server to server requests that uses /gateway or client side requests, injecting mandatory
 * headers won't be required, because gateway will provide these headers automatically by default.
 */
export const injectServiceToServiceMandatoryHeaders = (url, initArg) => {
  const isTiketLoadBalancer = url.includes(serverSideEndpoint ?? "https://lb");
  const isServiceToService = isTiketLoadBalancer && !url.includes("gateway");
  if (isServiceToService) {
    return {
      opts: {
        ...initArg.opts,
        headers: {
          ...serviceToServiceMandatoryHeaders(),
          ...initArg.opts?.headers,
        },
      },
    };
  } else {
    return {};
  }
};
