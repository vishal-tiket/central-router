import { DEFAULT_CURRENCY, USERCURRENCY_COOKIE } from "../config";
import { getExistingSetCookie } from "@lib/middlewares/withSession";
import { getLanguageAndCurrency } from "@tiket/react-common-utilities";
import { serialize } from "cookie";

const ISOMORPHIC_COOKIE_CONFIG = {
  path: "/",
  sameSite: "lax",
  domain: ".tiket.com",
};

/* istanbul ignore next - used in ssr */
export const getAndSetCurrencyServer = (isWebView, ctx) => {
  const { currency: currencyFromCountryCode } = getLanguageAndCurrency({
    req: ctx?.req,
  });
  const currencyCookie = ctx?.req?.cookies?.[USERCURRENCY_COOKIE];

  let currency;

  if (isWebView) {
    const webViewCurrency = ctx?.req?.headers?.["x-currency"];

    currency = webViewCurrency || currencyCookie || DEFAULT_CURRENCY;
  } else {
    currency =
      ctx?.sessionData?.currency ||
      currencyFromCountryCode ||
      currencyCookie ||
      DEFAULT_CURRENCY;
  }

  setCurrencyServer(currency, ctx);

  return currency;
};

/* istanbul ignore next - used in ssr */
export const setCurrencyServer = (currency, ctx) => {
  // middleware has Set-Cookie in place, we need to carry them over
  const existingSetCookie = getExistingSetCookie(ctx.res);

  ctx.res.setHeader("Set-Cookie", [
    ...existingSetCookie,
    serialize(USERCURRENCY_COOKIE, currency, ISOMORPHIC_COOKIE_CONFIG),
  ]);
};

export const currencyFormat = (numberStr) => {
  if (!numberStr) {
    return "0";
  }

  return numberStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
