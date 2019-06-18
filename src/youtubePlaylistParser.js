const utils = require('./utils');
const PlaylistParser = require('./playlistParser');
const Playlist = require('./playlist');
const Track = require('./track');
const platforms = require('./platforms');
const queries = require('./queries').youtubeQueries;

class YoutubePlaylistParser extends PlaylistParser {
  constructor(jQueryInstance) {
    super(jQueryInstance);
    this.titleFilterRgx = /\s?((\[|\()(official(\s)*)*(music(\s)*)*(video|audio)(\]|\)))/gi;
    this.explicitRgx = /\s?(\[|\()Explicit(\]|\))/i;
    this.cleanRgx = /\s?(\[|\()Clean(\]|\))/i;
  }

  getAuthor(playlist) {
    const info = playlist(queries.authorQuery);
    const contents = info.get(0).firstChild.data;
    const author = contents.split(' • ')[1].trim();
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
    const img = info.get(0);
    const photo = img.attribs.src;
    return photo;
  }

  getPlatform() {
    return platforms.YOUTUBE;
  }

  getTitle(playlist) {
    const info = playlist(queries.titleQuery);
    const title = info.get(0).firstChild.data.trim();
    return title;
  }

  getTracks(playlist) {
    // no telegraphed length for now - Youtube always shows wrong count for some reason
    const tracks = playlist(queries.trackQuery);
    const artists = playlist(queries.trackArtistQuery);
    const titles = playlist(queries.trackTitleQuery);
    const lengths = playlist(queries.trackLengthQuery);

    const result = [];

    tracks.each((i, item) => {
      const track = {};

      let title = titles.get(i).firstChild.data.trim();
      title = title.replace(this.titleFilterRgx, '');

      const explicitIdx = utils.indexOfRgx(title, this.explicitRgx);
      let explicit = explicitIdx !== -1;
      if (explicit) title = title.substring(0, explicitIdx);
      else {
        const expIcon = this.$(item).find(queries.trackIsExplicitQuery);
        explicit = expIcon.length > 0;
      }

      title = title.replace(this.cleanRgx, '');
      const featrIdx = utils.indexOfRgx(title, / \(?(feat|ft). /gi);
      title = featrIdx !== -1 ? title.substring(0, featrIdx) : title;

      let artist = artists.get(i).children.find((x) => x.name === 'yt-formatted-string');
      if (artist.firstChild.nodeValue !== null) {
        let artistVal = artist.firstChild.nodeValue;
        if (artist.firstChild.nextSibling !== null)
          artistVal += artist.firstChild.nextSibling.firstChild.data;
        artist = artistVal;
      } else
        artist = artist.firstChild.firstChild.data;

      artist = artist.replace(/ & /g, ', ');
      artist = artist.replace(/ (ft|feat)./i, ',');

      const legacyTitle = `${artist} - `;
      const lastComma = legacyTitle.lastIndexOf(', ');
      if (lastComma !== -1) {
        const altLegacyTitle = utils.replaceAt(legacyTitle, lastComma, ', ', ' & ');
        title = title.replace(new RegExp(altLegacyTitle, 'i'), '');
      }
      title = title.replace(new RegExp(legacyTitle, 'i'), '');

      let length = lengths.get(i).firstChild.data.trim();
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
    result.photo = this.getPhoto(playlist);
    result.platform = this.getPlatform();
    result.tracklist = this.getTracks(playlist);
    return new Playlist(result);
  }
}

module.exports = YoutubePlaylistParser;

