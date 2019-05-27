const PageLoader = require('./pageLoader');

class SoundcloudPageLoader extends PageLoader {
  constructor(loadInfo) {
    super();
    this.eofClasses = loadInfo.eofClasses;
    this.songCountClasses = loadInfo.songCountClasses;
    this.trackClasses = loadInfo.trackClasses;
    this.isAtBottom = false;
    this.songCount = -1;
  }

  async loadCondition() {
    if (this.songCount === -1) {
      const countElements = await this.getElementsByClassName(this.songCountClasses);
      if (countElements.length < 1) return false;
      const countElement = countElements[0];
      const count = await countElement.getAttribute('title');
      if (count.length < 1) return false;
      this.songCount = parseInt(count);
    }
    if (!this.isAtBottom) {
      await this.driver.executeScript('scrollBy(0, 1000);');
      const elements = await this.getElementsByClassName(this.eofClasses);
      this.isAtBottom = elements.length > 0;
      return false;
    } else {
      const elements = await this.getElementsByClassName(this.trackClasses);
      return this.songCount === elements.length;
    }
  }

  async visit(url) {
    const res = super.visit(url);
    await this.driver.wait(this.loadCondition.bind(this), 30000, 'Waiting for page to load');
    return res;
  }
};

module.exports = SoundcloudPageLoader;
