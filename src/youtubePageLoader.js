const PageLoader = require('./pageLoader');

class YoutubePageLoader extends PageLoader {
  constructor(loadInfo) {
    super();
    this.songCountClasses = loadInfo.songCountClasses;
    this.trackClasses = loadInfo.trackClasses;
    this.songCount = -1;
  }

  async loadCondition() {
    if (this.songCount === -1) {
      const countElements = await this.getElementsByClassName(this.songCountClasses);
      if (countElements.length < 1) return false;
      const countElement = countElements[0];
      let parts = await countElement.getText();
      parts = parts.split('\n');
      let count = parts[parts.length - 1].split('•');
      count = count[0];
      if (count.length < 1) return false;
      this.songCount = parseInt(count);
    }
    await this.driver.executeScript('scrollBy(0, 1000);');
    const elements = await this.getElementsByClassName(this.trackClasses);
    return Math.abs(this.songCount - elements.length) < 6;
  }

  async visit(url) {
    const res = super.visit(url);
    await this.driver.wait(this.loadCondition.bind(this), 30000, 'Waiting for page to load');
    return res;
  }
};

module.exports = YoutubePageLoader;
