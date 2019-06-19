const queries = require('./queries');
const platforms = require('./platforms');

class QueryFactory {
  /**
   * @param {string} platform
   * @return {PlaylistQuery}
   */
  static getQueries(platform) {
    switch (platform) {
    case platforms.SOUNDCLOUD: return queries.soundcloudQueries;
    case platforms.YOUTUBE: return queries.youtubeQueries;
    case platforms.PRIME: return queries.primeQueries;
    default: return null;
    }
  }
}

module.exports = QueryFactory;
