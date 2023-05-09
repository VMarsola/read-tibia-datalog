module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-preset-env")({
      stage: 0,
    }),
    require("postcss-simple-vars")({
      variables: {
        primary: "#363636",
        primaryLight: "#434343",
        grey: "#868686",
        textColor: "#ffffff",
        gold: "#B8B233",
        green: "#49BE2E",
        purple: "#9552D4",
        titleSize: "1.5rem",
        textSize: "1rem",
      },
    }),
  ],
};
