const config = {
  development: {
    localUrl: "http://localhost:3000/quick_click/reset-password/",
    serverUrl: "https://hybrid.srishticampus.in/quick_click/reset-password/",
  },
  // production: {
  //     localUrl: 'https://your-production-local-url.com',
  //     serverUrl: 'https://your-production-server-url.com',
  // }
};

const environment = process.env.NODE_ENV || "development";

module.exports = config[environment];
