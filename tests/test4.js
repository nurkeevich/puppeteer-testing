const puppeteer = require("puppeteer");
const utils = require("../lib/utils");
const config = require("../lib/config");
const helpers = require("../lib/helpers");
const homePage = require("../pages/homePage");
const feedbackPage = require("../pages/feedbackPage");

describe("Login", () => {
  let browser;
  let page;

  before(async function() {
    browser = await puppeteer.launch({
      headless: config.headless,
      slowMo: config.slowMo
    });

    page = await browser.newPage();
  });

  after(async function() {
    await browser.close();
  });

  beforeEach(async function() {
    await helpers.loadURL(page, config.baseURL);
  });

  it("should submit Feedback", async () => {
    await helpers.click(page, homePage.FEEDBACK);
    await helpers.typeText(page, utils.generateID(10), feedbackPage.YOUR_NAME_BOX);
    await helpers.typeText(page, utils.generateEmail(), feedbackPage.YOUR_EMAIL_ADDRESS_BOX);
    await helpers.typeText(page, utils.generateID(10), feedbackPage.SUBJECT_BOX);
    await helpers.typeText(page, utils.generateID(30), feedbackPage.QUESTION_BOX);
    await helpers.click(page, feedbackPage.SEND_MESSAGE);
    await helpers.waitForText(page, feedbackPage.FEEDBACK_RESULT, "Thank you for your comments");
  });
});
