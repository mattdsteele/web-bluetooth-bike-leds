exports.config = {
  bundles: [{ components: ["my-app"] }],
  collections: [{ name: "@stencil/router" }]
};

exports.devServer = {
  root: "www",
  watchGlob: "**/**"
};
