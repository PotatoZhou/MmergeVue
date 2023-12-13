export const resolve = {
    fallback: {
        path: require.resolve("path-browserify"),
    },
};

module.exports = {
    devServer: {
        host: '0.0.0.0',
        public: "183.6.153.226:8080",
        open: true,
        https: false,
        port: 8080,
        historyApiFallback: true,
        allowedHosts: "all"
      },
};
  