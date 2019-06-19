const PageLoader = require('./pageLoader');
const platforms = require('./platforms');
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
    case platforms.SOUNDCLOUD: return new SoundcloudPageLoader(queries.soundcloudQueries.counterInfo);
    case platforms.PRIME: return new PrimePageLoader(queries.primeQueries.counterInfo);
    case platforms.YOUTUBE: return new YoutubePageLoader(queries.youtubeQueries.counterInfo);
    default: return null;
    }
  }
}

module.exports = LoaderFactory;
