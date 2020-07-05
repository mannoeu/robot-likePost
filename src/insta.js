const puppeteer = require("puppeteer");
const url = "http://www.instagram.com/";
const hashtagsURL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;

const instagram = {
  broswer: null,
  page: null,

  initialize: async () => {
    instagram.broswer = await puppeteer.launch({
      headless: false,
    });

    instagram.page = await instagram.broswer.newPage();
    await instagram.page.goto(url, { waitUntil: "networkidle2" });
  },

  login: async (user, pass) => {
    await instagram.page.waitFor(2000);

    await instagram.page.type('input[name="username"]', user, { delay: 50 });
    await instagram.page.type('input[name="password"]', pass, { delay: 50 });

    loginButton = await instagram.page.$x('//div[contains(text(), "Entrar")]');
    await loginButton[0].click();

    await instagram.page.waitFor(2000);
    await instagram.page.waitFor('a > img[class="_6q-tv"]');

    let close = await instagram.page.$x(
      '//button[contains(text(), "Agora não")]'
    );
    await close[0].click();

    await instagram.page.waitFor(2000);

    let notificacao = await instagram.page.$x(
      '//button[contains(text(), "Agora não")]'
    );
    await notificacao[0].click();

    debugger;
  },

  hashtags: async (tags = []) => {
    for (let tag of tags) {
      await instagram.page.goto(hashtagsURL(tag), {
        waitUntil: "networkidle2",
      });

      await instagram.page.waitFor(1000);

      // mudaram a porra da div mãe ele n ta pegando todos os posts
      let posts = await instagram.page.$$(
        'article > div:nth-child(3) img[decoding="auto"]'
      );

      for (let i = 0; i < 2; i++) {
        let post = posts[i];
        await post.click();

        await instagram.page.waitFor(
          'span[id="react-root"],[aria-hidden="true"]'
        );

        await instagram.page.waitFor(1000);

        let curtir = await instagram.page.$('svg[aria-label="Curtir"]');

        curtir &&
          (await curtir.click(), console.log("vc curtiu um post em #" + tag));

        await instagram.page.waitFor(1000);

        let fecharModal = await instagram.page.$('svg[aria-label="Fechar"]');
        await fecharModal.click();

        await instagram.page.waitFor(1000);
      }

      await instagram.page.waitFor(4000);
    }
  },
};

module.exports = instagram;
