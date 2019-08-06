module.exports = {

  click: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Could NOT CLICK on selector: ${selector}`);
    }
  },

  typeText: async function (page, text, selector) {
    try {
      await page.waitForSelector(selector);
      await page.type(selector, text);
    } catch (error) {
      throw new Error(`Could NOT type TEXT in to selector: ${selector}`);
    }
  },

  loadURL: async function (page, URL) {
    await page.goto(URL, {
      waitUntil: "networkidle0"
    });
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return page.$eval(selector, e.innerHTML);
    } catch (error) {
      throw new Error(`Could not get TEXT from selector: ${selector}`);
    }
  },

  getCount: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return page.$$eval(selector, items => items.length);
    } catch (error) {
      throw new Error(`Could not get COUNT of selector: ${selector}`);
    };
  },

  waitForText: async function (page, selector, text) {
    try {
      await page.waitForSelector(selector);
      await page.waitForFunction((selector, text) =>
        document.querySelector(selector).innerText.includes(text),
        {},
        selector,
        text
      )
    } catch (error) {
      throw new Error(`Text: ${text} NOT FOUND for selector: ${selector}`)
    }
  },

  pressKey: async function (page, key) {
    try {
      await page.keyboard.press(key)
    } catch (error) {
      throw new Error(`Could NOT press key: ${key}`)
    }
  },

  shouldExist: async function (page, selector) {
    try {
      await page.waitForSelector(selector, {
        visiable: true
      });
    } catch (error) {
      throw new Error(`Selector ${selector} not exist`);
    }
  },

  shouldNotExist: async function (page, selector) {
    try {
      await page.waitFor(() => !document.querySelector(selector));
    } catch (error) {
      throw new Error(`Selector ${selector} is visiable, but should not`);
    }
  },

  isSelectorExist: async function (page, selector) {
    try {
      return !!(await page.$(selector));
    } catch (error) {
      return false;
    }
  }

};
