const puppeteer = require("puppeteer");
// const expect = require('chai').expect;
const config = require("../lib/config");

const click = require("../lib/helpers").click;
const type = require("../lib/helpers").typeText;
const loadURL = require("../lib/helpers").loadURL;
const waitForText = require("../lib/helpers").waitForText;
const pressKey = require("../lib/helpers").pressKey;
const shouldExist = require("../lib/helpers").shouldExist;

const utils = require("../lib/utils")

describe("Describe method here", () => {
  let browser;
  let page;

  before(async function() {
    browser = await puppeteer.launch({
      headless: config.headless,
      timeout: config.timeout
    });

    page = await browser.newPage();
  });

  after(async function() {
    browser.close();
  });

  it("should click", async () => {
    await loadURL(page, config.baseURL);
    await click(page, "#name");
  });

  it("should type", async () => {
    await shouldExist(page, "#name");
    // await type(page, "Tilekbek Kadyrov", "#name");
    await type(page, utils.generatPhoneNumber(), "#name");
    await page.waitFor(3000);
    await pressKey(page, "Enter");
    await waitForText(page, "body", "Practice Page");
  });
});
