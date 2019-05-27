const PageLoader = require('./pageLoader');


class PrimePageLoader extends PageLoader {
  constructor(loadInfo) {
    super();
    this.songCountClasses = loadInfo.songCountClasses;
    this.trackClasses = loadInfo.trackClasses;
    this.initValue = loadInfo.initValue;
    this.songCount = -1;
  }

  async loadCondition() {
    if (this.songCount === -1) {
      const countElements = await this.getElementsByClassName(this.songCountClasses);
      if (countElements.length < 1) return false;
      const countElement = countElements[0];
      let parts = await countElement.getText();
      if (parts === this.initValue) return false;
      parts = parts.split(' ');
      const count = parts[0];
      if (count.length < 1) return false;
      this.songCount = parseInt(count);
    }
    await this.driver.executeScript('scrollBy(0, 1000);');
    const elements = await this.getElementsByClassName(this.trackClasses);
    const visibleElements = [];

    for (const x of elements) {
      const displayValue = await x.getCssValue('display');
      if (displayValue !== 'none') visibleElements.push(x);
    }
    return this.songCount === visibleElements.length;
  }

  async visit(url) {
    const res = super.visit(url);
    await this.driver.wait(this.loadCondition.bind(this), 30000, 'Waiting for page to load');
    return res;
  }
};


module.exports = PrimePageLoader;
