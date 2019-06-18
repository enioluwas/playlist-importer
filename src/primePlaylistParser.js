const utils = require('./utils');
const PlaylistParser = require('./playlistParser');
const Playlist = require('./playlist');
const Track = require('./track');
const platforms = require('./platforms');
const queries = require('./queries').primeQueries;

class PrimePlaylistParser extends PlaylistParser {
  constructor(jQueryInstance) {
    super(jQueryInstance);
    this.explicitStr = ' [Explicit]';
    this.featRgx = /\s(\[|\()feat(\.)?\s/i;
  }

  getAuthor(playlist) {
    const info = playlist(queries.authorQuery);
    const contents = info.get(0).firstChild.data;
    const author = contents.split(' by ')[1].trim();
    return author;
  }

  getDescription(playlist) {
    const info = playlist(queries.descriptionQuery);
    if (info.length < 1) return null;
    const description = info.get(0).firstChild.data.trim();
    return description;
  }

  getPhoto(playlist) {
    const info = playlist(queries.photoQuery);
    const headerDiv = info.get(0).firstChild;
    const img = headerDiv.children.find((x) => x.name === 'img');
    const photo = img.attribs.src;
    return photo;
  }

  getPlatform() {
    return platforms.PRIME;
  }

  getTitle(playlist) {
    const info = playlist(queries.titleQuery);
    const title = info.get(0).firstChild.data.trim();
    return title;
  }

  getTracks(playlist) {
    let telegraphedLength = playlist(queries.telegraphedLengthQuery).get(0).firstChild.data;
    telegraphedLength = telegraphedLength.split(' ')[0];
    telegraphedLength = parseInt(telegraphedLength);
    const tracks = playlist(queries.trackQuery).filter((i, x) => {
      if (!x.attribs) return true;
      if (!x.attribs.style) return true;
      if (!x.attribs.style.includes('display: none')) return true;
      return false;
    });
    const artists = playlist(queries.trackArtistQuery).slice(0, tracks.length);
    const titles = playlist(queries.trackTitleQuery);
    const lengths = playlist(queries.trackLengthQuery);


    if (telegraphedLength !== tracks.length)
      throw new Error('This playlist link seems invalid');

    const result = [];

    tracks.each((i) => {
      const track = {};

      let title = titles.get(i).firstChild.data.trim();

      const explicitIdx = title.indexOf(this.explicitStr);
      const explicit = explicitIdx !== -1;
      if (explicit) title = title.substring(0, explicitIdx);

      const featIdx = utils.indexOfRgx(title, this.featRgx);
      title = featIdx !== -1 ? title.substring(0, featIdx) : title;

      let artist = artists.get(i).firstChild.firstChild.firstChild.data.trim();
      artist = artist.replace(/(\[|\])/g, '');
      artist = utils.replaceAll(artist, ' feat.', ',');
      artist = utils.replaceAll(artist, ' & ', ', ');

      let length = lengths.get(i).firstChild.data;
      length = utils.timeStringToSeconds(length);

      track.title = title;
      track.artist = artist;
      track.length = length;
      track.isExplicit = explicit;
      result.push(new Track(track));
    });

    return result;
  }

  parsePlaylist(playlist) {
    const result = {};
    result.author = this.getAuthor(playlist);
    result.title = this.getTitle(playlist);
    result.description = this.getDescription(playlist);
    result.platform = this.getPlatform();
    result.photo = this.getPhoto(playlist);
    result.tracklist = this.getTracks(playlist);
    return new Playlist(result);
  }
}

module.exports = PrimePlaylistParser;
