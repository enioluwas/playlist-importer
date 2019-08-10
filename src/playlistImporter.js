const to = require('await-to-js').to;
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const platforms = require('./platforms');
const platformChecker = require('./platformChecker');
const parserFactory = require('./parserFactory');
const loaderFactory = require('./loaderFactory');
const liteImporter = require('playlist-importer-lite');


class ImporterStatic {
  /**
   *
   * @param {string} url
   * @return {string}
   */
  static getPlatform(url) {
    if (platformChecker.isApple(url)) return platforms.APPLE;
    else if (platformChecker.isPandora(url)) return platforms.PANDORA;
    else if (platformChecker.isPrimeMusic(url)) return platforms.PRIME;
    else if (platformChecker.isSoundcloud(url)) return platforms.SOUNDCLOUD;
    else if (platformChecker.isSpotify(url)) return platforms.SPOTIFY;
    else if (platformChecker.isYouTubeMusic(url)) return platforms.YOUTUBE;
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

    if ([platforms.APPLE, platforms.SPOTIFY, platforms.PANDORA].includes(platform))
      return liteImporter.getPlaylistData(url);


    const loader = loaderFactory.getLoader(platform);
    const [lError] = await to(loader.visit(formattedUrl));
    if (null !== lError) {
      const [qError] = await to(loader.quit());
      if (null !== qError) throw new Error(`${lError.message}\n${qError.message}`);
      throw lError;
    }

    const [sError, source] = await to(loader.getPageSource());
    if (null !== sError) {
      const [qError] = await to(loader.quit());
      if (null !== qError) throw new Error(`${sError.message}\n${qError.message}`);
      throw sError;
    }

    const [qError] = await to(loader.quit());
    if (null !== qError) throw qError;

    let body = iconv.decode(Buffer.from(source), 'utf8');
    body = cheerio.load(body, { decodeEntities: true });
    const parser = parserFactory.getParser(platform, body);
    let playlist;

    try {
      playlist = parser.parsePlaylist(body);
    } catch (error) {
      throw new Error(`There was a problem parsing this ${platform} playlist.`);
    }

    return playlist;
  }
};


module.exports = ImporterStatic;
