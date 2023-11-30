/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
