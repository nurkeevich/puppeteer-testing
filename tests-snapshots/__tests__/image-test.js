const puppeteer = require("puppeteer");
const { toMatchImageSnapshot } = require("jest-image-snapshot");
const config = require("../../lib/config");

expect.extend({ toMatchImageSnapshot });

describe("Home page snapshot", () => {
  let browser;
  let page;

  // screenshot options
  const options = {
    path: config.homePageSnapshotPath,
    fullPage: true
  }

  beforeAll(async function() {
    browser = await puppeteer.launch({
      headless: true
    });

    page = await browser.newPage();
  });

  afterAll(async function() {
    await browser.close();
  });

  it("should visual test", async () => {
    // home page url
    await page.goto(config.baseURL);
    const image = await page.screenshot(options);

    expect(image).toMatchSnapshot(config.homePageSnapshotPath);
  });
});
