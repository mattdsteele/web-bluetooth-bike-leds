exports.config = {
  bundles: [
    { components: ["bluetooth-strip", "my-app", "mock-bluetooth-strip"] }
  ]
};

exports.devServer = {
  root: "www",
  watchGlob: "**/**"
};
