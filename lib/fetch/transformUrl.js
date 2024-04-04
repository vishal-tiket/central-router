import { isServer } from "./constructFetchInit";

const serverSideGatewayEndpoint =
  process.env.SERVER_SIDE_SERVICE_ENDPOINT + "/gateway";
const BASE_URL = process.env.BASE_URL;

export const transformUrl = (endpoint, initArg) => {
  const isNonGateway = endpoint.includes("http");

  if (isNonGateway) {
    return endpoint;
  } else if (isServer(initArg)) {
    return serverSideGatewayEndpoint + endpoint;
  } else {
    const origin = BASE_URL ?? location.origin;
    return `${origin}/ms-gateway${endpoint}`;
  }
};
