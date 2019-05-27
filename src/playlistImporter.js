const to = require('await-to-js').to;
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const platformChecker = require('./platformChecker');
const parserFactory = require('./parserFactory');
const loaderFactory = require('./loaderFactory');


class ImporterStatic {
  /**
   *
   * @param {string} url
   * @return {string}
   */
  static getPlatform(url) {
    if (platformChecker.isApple(url)) return 'apple';
    else if (platformChecker.isPandora(url)) return 'pandora';
    else if (platformChecker.isPrimeMusic(url)) return 'prime';
    else if (platformChecker.isSoundcloud(url)) return 'soundcloud';
    else if (platformChecker.isSpotify(url)) return 'spotify';
    else if (platformChecker.isYouTubeMusic(url)) return 'youtube';
    else return null;
  }

  /**
   *
   * @param {string} url
   * @return {string} formatted url
   */
  static formatPlaylistUrl(url) {
    let urlToTest = url;
    if (!urlToTest) return url;
    if (!urlToTest.startsWith('https://'))
      if (!urlToTest.startsWith('http://')) urlToTest = `https://${urlToTest}`;
    return urlToTest;
  }

  /**
   *
   * @param {string} url
   * @param {Function} onResult
   * @return {Promise<Playlist>} Playlist data
   */
  static async getPlaylistData(url) {
    const formattedUrl = this.formatPlaylistUrl(url);
    const platform = this.getPlatform(formattedUrl);
    if (null === platform)
      throw new Error('Invalid/unrecognized playlist link');

    if ('applepandoraspotify'.includes(platform))
      throw new Error(`Use the playlist-importer package instead for ${platform} playlists`);

    const loader = loaderFactory.getLoader(platform);
    const [lError] = await to(loader.visit(formattedUrl));
    if (null !== lError) throw lError;

    const [sError, source] = await to(loader.getPageSource());
    if (null !== sError) throw sError;

    const [qError] = await to(loader.quit());
    if (null !== qError) throw qError;

    let body = iconv.decode(Buffer.from(source), 'utf8');
    body = cheerio.load(body, { decodeEntities: true });
    const parser = parserFactory.getParser(platform, body);
    const playlist = parser.parsePlaylist(body);
    return playlist;
  }
};


module.exports = ImporterStatic;
