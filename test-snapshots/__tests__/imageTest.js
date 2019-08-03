const puppeteer = require("puppeteer");
const { toMatchImageSnapshot } = require("jest-image-snapshot");
const config = require("../../lib/config");
const helpers = require("../../lib/helpers");
const utils = require("../../lib/utils");

expect.extend({toMatchImageSnapshot})

describe("Snapshot Test", ()=> {
    let browser;
    let page;

    beforeAll(async function () {
        browser = await puppeteer.launch({
            headless: false
        });

        page = await browser.newPage();
    });

    afterAll(async function () {
        await browser.close();
    });

    test("home page snapshot", async ()=> {
        await helpers.loadURL(page, "https://google.com");
        const image = await page.screenshot();
        expect(image).toMatchSnapshot();
    })
})