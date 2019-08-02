const puppeteer = require("puppeteer");
const expect = require('chai').expect;

const config = require("../../lib/config");
const helpers = require("../../lib/helpers");
const utils = require("../../lib/utils");

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

  beforeEach(async function () {
    await helpers.loadURL(page, config.baseURL);
  })

  it("should NOT login with invalid credentials", async () => {
    await helpers.click(page, "#signin_button");
    await helpers.typeText(page, utils.generateID(15), "#user_login");
    await helpers.typeText(page, utils.generateID(15), "#user_password");
    await helpers.click(page, "[name='submit']");
    await helpers.shouldExist(page, "[class='alert alert-error']");
  });

  it("should display [No results were found for the query: ] when invalid character entered to Search box", async() => {
    await helpers.typeText(page, utils.generateID(10), "#searchTerm")
    await helpers.pressKey(page, "Enter");
    await helpers.waitForText(page, "[class='top_offset']", "No results were found for the query");
  }),

  it("should display [HOME/ONLINE BANKING/FEEDBACK] buttons", async ()=> {
    const numberOfLinks = await helpers.getCount(page, "#pages-nav > li");
    expect(numberOfLinks).to.equal(3)
  }),

  it("should display message successfully after sendin message with correct inputs", async ()=> {
      
  })
});
