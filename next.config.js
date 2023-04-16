/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: "nextShota",
        mongodb_password: "zZWhlN4W3NltwjPL",
        mongodb_clustername: "cluster0",
        mongodb_database: "blog",
      },
    };
  }
  return {
    reactStrictMode: true,
    env: {
      mongodb_username: "nextShota",
      mongodb_password: "zZWhlN4W3NltwjPL",
      mongodb_clustername: "cluster0",
      mongodb_database: "blog",
    },
  };
};

module.exports = nextConfig;
