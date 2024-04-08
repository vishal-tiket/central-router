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
    ];
  },
  headers() {
    return [
      {
        source: "/apple-app-site-association",
        headers: [{ key: "content-type", value: "application/json" }],
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
