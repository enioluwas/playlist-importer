SouncloudPlaylistParser = require('./soundcloudPlaylistParser');
PrimePlaylistParser = require('./primePlaylistParser');
YoutubePlaylistParser = require('./youtubePlaylistParser');

class ParserFactory {
  /**
   * @param {string} platform
   * @param {JQuery} jQueryInstance
   * @return {PlaylistParser}
   */
  static getParser(platform, jQueryInstance) {
    switch (platform) {
    case 'soundcloud': return new SoundcloudPlaylistParser(jQueryInstance);
    case 'prime': return new PrimePlaylistParser(jQueryInstance);
    case 'youtube': return new YoutubePlaylistParser(jQueryInstance);
    default: return null;
    }
  }
}

module.exports = ParserFactory;
