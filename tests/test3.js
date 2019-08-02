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
        await page.waitFor(5000);
        await helpers.shouldExist(page, "[placeholder='Email or phone']");
        await helpers.typeText(page, utils.generateID(5), "[placeholder='Email or phone']");
        await helpers.shouldExist(page, "[placeholder='Password']");
        await helpers.typeText(page, utils.generateID(5), "[placeholder='Password']");
        await helpers.click(page, "[class='btn btn-primary']");
        await helpers.waitForText(page, "#login_status", "Invalid credentials. Please try again.");
    })
})