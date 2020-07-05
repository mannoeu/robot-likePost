const ig = require("./insta");

(async () => {
  await ig.initialize();

  await ig.login("username", "password");

  await ig.hashtags(["coversbrasil", "musicacover", "covers"]);

  debugger;
})();
