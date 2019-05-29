const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

const options = new chrome.Options();
options.addArguments('disable-infobars');
// options.addArguments('headless');
options.addArguments('log-level=3');
options.addArguments('disable-extensions');
options.addArguments('disable-gpu');
options.addArguments('disable-logging');
// --disable-notifications
options.setUserPreferences({ credentials_enable_service: false });

class PageLoader {
  constructor() {
    this.driver = new Builder()
      .setChromeOptions(options)
      .forBrowser('chrome')
      .build();
  }

  async visit(url) {
    const res = await this.driver.get(url);
    return res;
  }

  async write(element, text) {
    return await element.sendKeys(text);
  }

  async quit() {
    return await this.driver.quit();
  }

  async getPageSource() {
    return await this.driver.getPageSource();
  }

  async getElementById(id) {
    // await this.driver.wait(until.elementLocated(By.id(id)), 5000, 'Searching for element by id');
    return await this.driver.findElement(By.id(id));
  }

  async getElementsByName(name) {
    // await this.driver.wait(until.elementLocated(By.name(name)), 5000, 'Searching for element by name');
    return await this.driver.findElements(By.name(name));
  }

  async getElementsByTagName(name) {
    // await this.driver.wait(until.elementLocated(By.tagName(name)), 5000, 'Searching for element by tag name');
    return await this.driver.findElements(By.tagName(name));
  }

  async getElementsByClassName(name) {
    // await this.driver.wait(until.elementLocated(By.className(name)), 5000, 'Searching for element by class name');
    return await this.driver.findElements(By.className(name));
  }

  async getElementByXPath(xpath) {
    return await this.driver.findElement(By.xpath(xpath));
  }

  async getElementsByXPath(xpath) {
    return await this.driver.findElements(By.xpath(xpath));
  }
};

module.exports = PageLoader;
