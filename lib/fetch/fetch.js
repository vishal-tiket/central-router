import EagleEye from "@tiket/react-common-eagle-eye";
// import { createLogger } from "../logger";
import { jsonParse } from "../helpers/json";
import { constructFetchInit } from "./constructFetchInit";
// import { refreshOrCreateTokenServer } from "./refreshOrCreateToken.server";
import { injectServiceToServiceMandatoryHeaders } from "./injectMandatoryHeaders";
import { isServer } from "./constructFetchInit";
import { transformUrl } from "./transformUrl";
import { stringifyURLQuery } from "./URLQueryParams";

// import { getBrowserCookieValue } from "../logger/utils";

// import { retry } from "./retry";

const NOOP = () => {};
const PROMISIFIED_NOOP = () => Promise.resolve();
const JWT_REGEX_PATTERN = /(^[\w-]*\.[\w-]*\.[\w-]*$)/;

const apiFetch = async (endpoint, initArg) => {
  initArg.createGuestToken = initArg?.createGuestToken ?? true;

  let url = transformUrl(endpoint, initArg);

  /**
   * Appending query params to url.
   * However, we do not re-appending query params on the retry mechanism
   * because it will result in double query params
   */
  if (!!initArg?.opts?.params && !initArg?.retry) {
    const queryParams = stringifyURLQuery(initArg?.opts?.params);
    url = `${url}?${queryParams}`;
  }

  /**
   * Eagle Eye is a lib to track all api calls
   * sent from Web. Currently only supported on WebViews,
   * but we should still keep it for non-webview calls, except
   * we're intentionally want to disable it for certain API calls.
   */
  let eagleEye = EagleEye({
    url,
    method: initArg.opts?.method,
    headers: initArg.opts?.headers,
    body: initArg.opts?.body,
  });

  /**
   * when eagleEye is disabled, we stub the eagleEye lib
   * to avoid messy conditionals on each eagleEye API calls.
   */
  if (initArg.isEagleEyeDisabled) {
    eagleEye = {
      start: NOOP,
      onFetchSuccess: PROMISIFIED_NOOP,
      onFetchException: NOOP,
    };
  }

  if (initArg.skipAuth) {
    eagleEye.start();

    const apiResponse = await fetch(url, {
      ...initArg.opts,
    });

    eagleEye.onFetchSuccess(apiResponse);

    return apiResponse;
  }

  // const isServerCall = isServer(initArg);

  // if (isServerCall) {
  //   await refreshOrCreateTokenServer(initArg);
  // }

  // const isWebViewClientCall =
  //   !isServerCall && !!getBrowserCookieValue("tiket-token-app");

  /** determines if this API call process is on WebView using non-JWT WebView token */
  let isLegacyNonJWTWebViewToken = false;

  const fetchFinalArgs = constructFetchInit({
    ...initArg,
    ...injectServiceToServiceMandatoryHeaders(url, initArg),
  });

  // if (isWebViewClientCall) {
  //   const tiketTokenApp = getBrowserCookieValue("tiket-token-app");

  //   // use Authorization header on tokens with JWT format.
  //   if (tiketTokenApp && JWT_REGEX_PATTERN.test(tiketTokenApp)) {
  //     fetchFinalArgs.headers = {
  //       ...fetchFinalArgs.headers,
  //       Authorization: `Bearer ${tiketTokenApp}`,
  //     };
  //   }

  //   // use accessToken header on tokens with non-JWT format.
  //   // part of legacy session implementation, for backward-compatibility
  //   if (tiketTokenApp && !JWT_REGEX_PATTERN.test(tiketTokenApp)) {
  //     isLegacyNonJWTWebViewToken = true;

  //     fetchFinalArgs.headers = {
  //       ...fetchFinalArgs.headers,
  //       accessToken: tiketTokenApp,
  //     };
  //   }
  // }

  const secureArgs = secureArgsPassword(fetchFinalArgs);

  try {
    eagleEye.start();

    let result = await fetch(url, { ...fetchFinalArgs, cache: "no-store" });

    /** emit fetch log on success */
    emitFetchLogger(url, secureArgs, result);

    eagleEye.onFetchSuccess(result);

    /**
     * when api responsed with success (2xx) or http statuses other than 401,
     * no additional actions should be taken by the fetcher, so early return is required.
     *
     * Also early return for legacy non-JWT App Webview flow since no
     * JWT token handling should be executed.
     */
    if (result.status !== 401 || isLegacyNonJWTWebViewToken) {
      return result;
    }

    if (result.status === 401) {
      // result = await retry(url, initArg, result);

      eagleEye.onFetchSuccess(result);
    }

    return result;
  } catch (e) {
    let errorMessage = "";

    if (e instanceof Error) {
      errorMessage = e.message;
    }

    /** emit fetch log on failure */
    emitFetchLogger(url, secureArgs, undefined, errorMessage);

    eagleEye.onFetchException(errorMessage);

    throw e;
  }
};

const secureArgsPassword = (args) => {
  if (args.method !== "GET" && args.body) {
    const securePasswordBody = jsonParse(args.body, "parse request body");

    if (securePasswordBody && securePasswordBody.password) {
      delete securePasswordBody.password;
    }

    return { ...args, body: securePasswordBody };
  } else {
    return args;
  }
};

// const logger = createLogger({ name: "app-api-fetch" });

const emitFetchLogger = async (
  url,
  requestInit,
  successResponse,
  errorResponse
) => {
  if (process.env.NODE_ENV === "test") return;

  let responseData;

  const { method, headers } = requestInit;

  const clientFetchLogData = {
    endpoint: url,
    headers,
    method: method ?? "GET",
    responseData,
    errorData: errorResponse,
    level: "info",
    msg: "Api Fetch",
  };

  try {
    if (
      successResponse?.ok &&
      successResponse.status === 200 &&
      successResponse.clone
    ) {
      const clonedResponse = successResponse.clone();
      responseData = await clonedResponse.json();

      clientFetchLogData.responseData = responseData;

      // logger.log(clientFetchLogData);
    } else {
      // logger.error(clientFetchLogData);
    }
  } catch (e) {
    // logger.error(e);
  }
};

export { apiFetch as fetch };
