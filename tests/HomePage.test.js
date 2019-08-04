const puppeteer = require("puppeteer");
const config = require("../lib/config");
const helpers = require("../lib/helpers");
const homePage = require("../pages/HomePage");

describe("Home page testing", () => {
  let browser;
  let page;

  let browserOptions = {
    headless: config.headless,
    slowMo: config.slowMo
  };

  before(async function () {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
  });

  after(async function () {
    await browser.close();
  });

  beforeEach(async function () {
    await helpers.loadURL(page, config.baseURL);
  });

  it("should display [search box, signin button, Nav bar [HOME/ONLINE BANKING/FEEDBACK]] elements", async () => {
    await helpers.shouldExist(page, homePage.SEARCH_BOX);
    await helpers.shouldExist(page, homePage.SIGNIN);
    await helpers.shouldExist(page, homePage.BANKING_FEATURES);
  });
});
