module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-vue",
    "stylelint-config-idiomatic-order",
  ],
  ignoreFiles: ["dist/**/*.css"],
  plugins: ["stylelint-order"],
};
