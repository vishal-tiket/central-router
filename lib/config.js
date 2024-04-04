export const VERTICAL_NAME = "flight";
export const BASE_URL =
  process.env.BASE_URL ?? /* istanbul ignore next */ location.origin;

export const HostnamePrefix = {
  MOBILE: "m.",
  DESKTOP_EN: "en.",
  DESKTOP_ID_PROD: "www.",
  DESKTOP_ID_NON_PROD: "",
};

/**
 * i18n
 */
export const DEFAULT_LOCALE = "id";

/**
 * cookie names
 */
export const LOCALE_COOKIE = "userlang";
export const USERCURRENCY_COOKIE = "tiket_currency";
export const SESSION_ACCESS_TOKEN_COOKIE = "session_access_token";
export const SESSION_REFRESH_TOKEN_COOKIE = "session_refresh_token";
export const LOGGER_BROWSER_CORRELATION_ID_KEY_COOKIE =
  "_tix_logger_correlation_id";
export const SESSION_DATA_COOKIE = "_tix_user_session_info";
export const LS_LOGGER_STORAGE = "TIX_NEXT_LOGGER";
export const LOCALE_SEARCH_PARAM = "lang";
export const DEVICE_ID_COOKIE = "device_id";

export const PAGE_ROUTES = {
  SLUG_PREVIEW: `/explore-preview`,
  VOUCHER_BOX: `/voucher-box`,
  PROMO_LIST: "/promo",
};
/**
 * currency
 */
export const DEFAULT_CURRENCY = "IDR";

// values for page visit event properties
export const PROMO_PAGE_SCREEN_NAME = "promoList";
export const HOME_PAGE_SCREEN_NAME = "home";
export const PROMO_DETAIL_PAGE_SCREEN_NAME = "promoDetail";

export const PROMO_DETAIL_EMPTY_STATE_CODE = {
  PLATFORM_UNAVAILABLE: "PLATFORM_UNAVAILABLE",
  PROMO_ENDED: "PROMO_ENDED",
  PROMO_NOT_FOUND: "PROMO_NOT_FOUND",
};
