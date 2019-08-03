const puppeteer = require("puppeteer");
const { toMatchImageSnapshot } = require("jest-image-snapshot");

expect.extend({ toMatchImageSnapshot });

describe("Home page snapshot", () => {
  let browser;
  let page;

  beforeAll(async function() {
    browser = await puppeteer.launch({
      headless: true
    });

    page = await browser.newPage();
  });

  afterAll(async function() {
    await browser.close();
  });

  test("snapshot home page", async () => {
      await page.goto("https://example.com");
      const image = page.screenshot();
      expect(image).toMatchSnapshot();
  });
});
