const Url = require('url');


/**
 * Included other music platforms in case of future support
 */
class PlatformChecker {
  /**
   * @param {string} url
   * @return {boolean}
   */
  static isApple(url) {
    const urlParsed = Url.parse(url, true);
    const playlistIndex = 2;
    const indentifierIndex = 4;
    if (urlParsed.host !== 'itunes.apple.com' && urlParsed.host !== 'music.apple.com') return false;
    const pathArray = urlParsed.pathname.split('/');
    if (pathArray.length !== 5) return false;
    if (pathArray[playlistIndex] !== 'playlist') return false;
    if (!pathArray[indentifierIndex].startsWith('pl.')) return false;
    return true;
  }

  /**
   * @param {string} url
   * @return {boolean}
   */
  static isSpotify(url) {
    const urlParsed = Url.parse(url, true);
    if (urlParsed.host !== 'open.spotify.com') return false;
    const pathArray = urlParsed.pathname.split('/');
    if (pathArray.length !== 3 && pathArray.length !== 5) return false;
    if (pathArray.length === 3)
      if (pathArray[1] !== 'playlist') return false;
    if (pathArray.length === 5) {
      if (pathArray[1] !== 'user') return false;
      if (pathArray[3] !== 'playlist') return false;
    }
    return true;
  }

  /**
   * @param {string} url
   * @return {boolean}
   */
  static isPandora(url) {
    const urlParsed = Url.parse(url, true);
    const playlistIndex = 1;
    const indentifierIndex = 2;
    if (urlParsed.host !== 'www.pandora.com' && urlParsed.host !== 'pandora.com') return false;
    const pathArray = urlParsed.pathname.split('/');
    if (pathArray.length !== 3) return false;
    if (pathArray[playlistIndex] !== 'playlist' && pathArray[playlistIndex] !== 'genre') return false;
    if (pathArray[indentifierIndex].length === 0) return false;
    if (pathArray[playlistIndex] === 'playlist' && !/PL:(\w)*:(\w)+/.test(pathArray[indentifierIndex])) return false;
    return true;
  }

  /**
   * @param {string} url
   * @return {boolean}
   */
  static isYouTubeMusic(url) {
    const urlParsed = Url.parse(url, true);
    if (urlParsed.host !== 'music.youtube.com') return false;
    const pathArray = urlParsed.pathname.split('/');
    if (pathArray.length !== 2) return false;
    if (urlParsed.query.list === undefined) return false;
    return true;
  }

  /**
   * @param {string} url
   * @return {boolean}
   */
  static isSoundcloud(url) {
    const urlParsed = Url.parse(url, true);
    if (urlParsed.host !== 'soundcloud.com' && urlParsed.host !== 'www.soundcloud.com') return false;
    const pathArray = urlParsed.pathname.split('/');
    if (pathArray.length !== 4) return false;
    if (!/(\w)+\/sets\/(\w)+/.test(urlParsed.path)) return false;
    return true;
  }

  /**
   * @param {string} url
   * @return {boolean}
   */
  static isPrimeMusic(url) {
    const urlParsed = Url.parse(url, true);
    const playlistIndex = 1;
    const idIndex = 2;
    if (urlParsed.host !== 'music.amazon.com') return false;
    const pathArray = urlParsed.pathname.split('/');
    if (pathArray.length !== 3) return false;
    if (pathArray[playlistIndex] !== 'playlists' && pathArray[playlistIndex] !== 'user-playlists') return false;
    if (pathArray[idIndex].length < 1) return false;
    return true;
  }
}

module.exports = PlatformChecker;
