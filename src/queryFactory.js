const queries = require('./queries');

class QueryFactory {
  /**
   * @param {string} platform
   * @return {PlaylistQuery}
   */
  static getQueries(platform) {
    switch (platform) {
    case 'soundcloud': return queries.appleQueries;
    case 'youtube': return queries.pandoraQueries;
    case 'prime': return queries.spotifyQueries;
    default: return null;
    }
  }
}

module.exports = QueryFactory;
