const webpack = require("webpack");

module.exports = {
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
  },

  // 👇 Add this PWA section
  pwa: {
    name: "School Management System",
    themeColor: "#2563EB",
    backgroundColor: "#ffffff",
    manifestOptions: {
      short_name: "SchoolSys",
      start_url: ".",
      display: "standalone",
      icons: [
        {
          src: "icons/192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
};
