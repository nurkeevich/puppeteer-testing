const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const config = require('../../lib/config');
const helpers = require('../../lib/helpers');
const homePage = require('../../pages/HomePage');
const onlineBankingPage = require('../../pages/OnlineBankingPage');
const loginPage = require('../../pages/LoginPage');

describe('Online banking page testing', () => {
    let browser;
    let page;

    // browser options
    let browserOptions = {
        headless: config.headless,
        slowMo: config.slowMo
    };

    before(async function () {
        browser = await puppeteer.launch(browserOptions);
        page =  await browser.newPage();
    });

    after(async function () {
        await browser.close();
    });

    beforeEach(async function () {
        await helpers.loadURL(page, config.baseURL);
        await helpers.click(page, homePage.ONLINE_BANKING);
        await helpers.shouldExist(page, onlineBankingPage.ACCOUNT_SUMMARY);
    });

    it('should display [Account Summary]', async () => {
        await helpers.click(page, onlineBankingPage.ACCOUNT_SUMMARY);
        const isDisplayed = await helpers.isSelectorExist(page, loginPage.LOGIN);
        expect(isDisplayed).to.be.true;
    });
});