const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

const options = new chrome.Options();
options.addArguments('disable-infobars');
options.addArguments('headless');
options.addArguments('log-level=3');
options.addArguments('disable-extensions');
options.addArguments('disable-gpu');
options.addArguments('mute-audio');
options.excludeSwitches('enable-logging');
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
    return await this.driver.findElement(By.id(id));
  }

  async getElementsByName(name) {
    return await this.driver.findElements(By.name(name));
  }

  async getElementsByTagName(name) {
    return await this.driver.findElements(By.tagName(name));
  }

  async getElementsByClassName(name) {
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
