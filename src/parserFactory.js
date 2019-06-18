const SoundcloudPlaylistParser = require('./soundcloudPlaylistParser');
const PrimePlaylistParser = require('./primePlaylistParser');
const YoutubePlaylistParser = require('./youtubePlaylistParser');
const platforms = require('./platforms');

class ParserFactory {
  /**
   * @param {string} platform
   * @param {JQuery} jQueryInstance
   * @return {PlaylistParser}
   */
  static getParser(platform, jQueryInstance) {
    switch (platform) {
    case platforms.SOUNDCLOUD: return new SoundcloudPlaylistParser(jQueryInstance);
    case platforms.PRIME: return new PrimePlaylistParser(jQueryInstance);
    case platforms.YOUTUBE: return new YoutubePlaylistParser(jQueryInstance);
    default: return null;
    }
  }
}

module.exports = ParserFactory;
