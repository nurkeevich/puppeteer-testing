const puppeteer = require("puppeteer");
const config = require("../lib/config");
const helpers = require("../lib/helpers");
const Signin = require("../pages/HomePage").SIGNIN;
const loginPage = require("../pages/LoginPage");
const utils = require("../lib/utils");

describe("Login page testing", () => {
    let browser;
    let page;

    // browser options
    let browserOptions = {
        headless: config.headless,
        slowMo: config.slowMo
    }

    before(async function () {
        browser = await puppeteer.launch(browserOptions);
        page = await browser.newPage();
    });

    after(async function () {
        await browser.close();
    });

    beforeEach(async function () {
        await helpers.loadURL(page, config.baseURL);
        await helpers.click(page, Signin);
        await helpers.shouldExist(page, loginPage.LOGIN);
    });

    it("should not login with invalid EMAIL address", async () => {
        await helpers.typeText(page, utils.generateEmail(), loginPage.LOGIN);
        await helpers.typeText(page, utils.generateID(10), loginPage.PASSWORD);
        await helpers.click(page, loginPage.SIGNIN);
        await helpers.waitForText(page, "body", "Login and/or password are wrong.");
    })
})