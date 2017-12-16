exports.config = {
  serviceWorker: {
    globPatterns: ["**/*.{js,css,html,png,jpg}"]
  },
  bundles: [
    { components: ["bluetooth-strip", "my-app", "mock-bluetooth-strip"] }
  ]
};

exports.devServer = {
  root: "www",
  watchGlob: "**/**"
};
