const puppeteer = require("puppeteer");
const config = require("../../lib/config");
const helpers = require("../../lib/helpers");
const utils = require("../../lib/utils");

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
    await helpers.loadURL(page, config.baseURL);
    await helpers.click(page, "#name");
  });

  it("should type", async () => {
    await helpers.shouldExist(page, "#name");
    await helpers.typeText(page, utils.generatPhoneNumber(), "#name");
    await page.waitFor(3000);
    await helpers.pressKey(page, "Enter");
    await helpers.waitForText(page, "body", "Practice Page");
  });
});
