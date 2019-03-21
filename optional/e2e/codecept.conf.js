exports.config = {
  tests: "./*_test.js",
  output: "./output",
  helpers: {
    Puppeteer: {
      url: "https://codedutravail-dev.num.social.gouv.fr",
      chrome: {
        args: ["--no-sandbox", "--dissable-gpu", "--disable-setuid-sandbox"],
        headless: false
      }
    }
  },
  include: {},
  bootstrap: null,
  mocha: {},
  name: "e2e"
};
