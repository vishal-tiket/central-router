/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/apple-app-site-association",
        destination: "/apple-app-site-association.json",
      },
      {
        source: "/storage/index.html",
        destination: "/storage/index.html",
      },
      {
        source: "/event.ics",
        destination: "/event.ics",
      },
      {
        source: "/uc?export=download&id=1eLlSqP70KYV3ONFYzHJ39CqS-av6kbvO",
        destination:
          "https://drive.google.com/uc?export=download&id=1eLlSqP70KYV3ONFYzHJ39CqS-av6kbvO", // Matched parameters can be used in the destination
      },
    ];
  },
  headers() {
    return [
      {
        source: "/apple-app-site-association",
        headers: [{ key: "content-type", value: "application/json" }],
      },
      {
        source: "/event.ics",
        headers: [{ key: "content-type", value: "text/calendar" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/redirect301",
        destination: "/hotel",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/redirect302",
        destination: "/hotel",
        permanent: false,
        statusCode: 302,
      },
      {
        source: "/redirect307",
        destination: "/hotel",
        permanent: false,
      },
      {
        source: "/redirect308",
        destination: "/hotel",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
