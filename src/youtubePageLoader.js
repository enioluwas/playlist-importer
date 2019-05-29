const PageLoader = require('./pageLoader');
const { By } = require('selenium-webdriver');

class YoutubePageLoader extends PageLoader {
  constructor(loadInfo) {
    super();
    this.continuationsXpath = loadInfo.continuationsXpath;
  }

  async loadCondition() {
    await this.driver.executeScript('scrollBy(0, 1000);');
    const continuations = await this.getElementsByXPath(this.continuationsXpath);
    if(continuations.length === 0) 
      return false;
    const hasContinuations = await continuations[0].findElements(By.xpath('.//*'));
    return hasContinuations.length === 0;
  }

  async visit(url) {
    const res = super.visit(url);
    await this.driver.wait(this.loadCondition.bind(this), 30000, 'Waiting for page to load');
    return res;
  }
};

module.exports = YoutubePageLoader;
