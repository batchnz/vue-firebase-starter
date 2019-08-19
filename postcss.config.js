module.exports = {
  plugins: [
    // require("tailwindcss")("tailwind.config.js"),
    // require("autoprefixer")()

    require("postcss-extend-rule"),
    require("postcss-advanced-variables"),
    require("postcss-preset-env"), // Defaults to Stage 2
    require("postcss-atroot"),
    require("postcss-property-lookup"),
    require("tailwindcss")("tailwind.config.js"),
    require("postcss-nested"),
    require("autoprefixer")(),
    // require("stylelint"),
    require("postcss-reporter")({ clearReportedMessages: true })
  ]
};
