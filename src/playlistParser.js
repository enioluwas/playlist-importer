const Playlist = require('./playlist');

/**
 * Used as an abstract class
 */
class PlaylistParser {
  /**
   * @param {JQuery} jQueryInstance
   */
  constructor(jQueryInstance) {
    this.$ = jQueryInstance;
  }

  /**
   * @param {JQuery} playlist
   * @return {string}
   */
  getAuthor(playlist) {
    return '';
  }

  /**
   * @param {JQuery} playlist
   * @return {string}
   */
  getDescription(playlist) {
    return '';
  }


  /**
   * @param {JQuery} playlist
   * @return {string}
   */
  getPhoto(playlist) {
    return '';
  }

  /**
   * @return {string}
   */
  getPlatform() {
    return '';
  }
  /**
   * @param {JQuery} playlist
   * @return {string}
   */
  getTitle(playlist) {
    return '';
  }


  /**
   * @param {JQuery} playlist
   * @return {Array<Track>}
   */
  getTracks(playlist) {
    return [];
  }

  /**
   * @param {JQuery} playlist
   * @return {Playlist}
   */
  parsePlaylist(playlist) {
    return new Playlist();
  }
}

module.exports = PlaylistParser;
