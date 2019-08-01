const puppeteer = require("puppeteer");
const config = require("../lib/config");
const helpers = require("../lib/helpers");
const utils = require("../lib/utils");

describe("Login", ()=> {
    let browser;
    let page;

    before(async function () {
        browser = await puppeteer.launch({
            headless: false,
            timeout: config.timeout,
            slowMo: config.slowMo
        });

        page = await browser.newPage();
    })

    after(async function () {
        await browser.close();
    })

    beforeEach(async function () {
        await helpers.loadURL(page, config.baseURL);
    })

    it("should NOT login with invalid credentials", async ()=> {
        await helpers.click(page, "[data-toggle='modal']");
        await helpers.shouldExist(page, "#user_login");
        await helpers.typeText(page, utils.generateID(5), "#user_login");
        await helpers.shouldExist(page, "#user_password");
        await helpers.typeText(page, utils.generateID(5), "#user_password");

        await page.waitFor(5000);

        await helpers.click(page, "#login_btn");
        await helpers.waitForText(page, "#login_status", "Invalid credentials. Please try again.");
    })
})