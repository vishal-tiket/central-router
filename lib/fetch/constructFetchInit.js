import { getCommonHeaders } from "@tiket/react-common-utilities";
/**
 * Util function to create init options (2nd argument of fetch)
 * - with `lang` header (client, getServerSideProps, getStaticProps)
 * - with `Authorization` header (getServerSideProps only)
 *
 * Works for client-side and also server-side (getServerSideProps, getStaticProps) fetches with
 * different signatures:
 * - Client-side: accepts `locale`
 * - Server-side: accepts `ctx`
 */

export function constructFetchInit(arg) {
  return {
    ...arg.opts,
    headers: {
      ...arg?.opts?.headers,
      ...getCommonHeaders(arg),
    },
  };
}

export const isServer = (arg) => {
  return "ctx" in arg && "req" in arg?.ctx && "res" in arg?.ctx;
};

export const isStatic = (arg) => {
  return "ctx" in arg && "locale" in arg?.ctx;
};
