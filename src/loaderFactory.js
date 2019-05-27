const PageLoader = require('./pageLoader');
const SoundcloudPageLoader = require('./soundcloudPageLoader');
const PrimePageLoader = require('./primePageLoader');
const YoutubePageLoader = require('./youtubePageLoader');
const queries = require('./queries');


class LoaderFactory {
  /**
   * @param {string} platform
   * @return {PageLoader}
   */
  static getLoader(platform) {
    switch (platform) {
    case 'soundcloud': return new SoundcloudPageLoader(queries.soundcloudQueries.counterInfo);
    case 'prime': return new PrimePageLoader(queries.primeQueries.counterInfo);
    case 'youtube': return new YoutubePageLoader(queries.youtubeQueries.counterInfo);
    default: return null;
    }
  }
}

module.exports = LoaderFactory;
