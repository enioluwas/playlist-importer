const utils = require('./utils');
const PlaylistParser = require('./playlistParser');
const queries = require('./queries').soundcloudQueries;
const Playlist = require('./playlist');
const SoundcloudTrack = require('./soundcloudTrack');
const platforms = require('./platforms');

class SoundcloudPlaylistParser extends PlaylistParser {
  constructor(jQueryInstance) {
    super(jQueryInstance);
    this.extraInfoRgx = /\[.+\]/gi;
    this.featRgx = /\s?(\(|\s)(feat|ft)\.?\s?/gi;
    this.trackSplitRgx = /\s+(-|\||~)\s+/;
  }

  getAuthor(playlist) {
    const info = playlist(queries.authorQuery);
    const author = info.get(0).firstChild.data.trim();
    return author;
  }

  getDescription(playlist) {
    const info = playlist(queries.descriptionQuery);
    let container = info.get(0).children.find((x) => x.name === 'div' && x.attribs.class === 'sc-type-small');
    if (undefined === container) return null;
    container = container.children.find((x) => x.name === 'div');
    if (undefined === container) return null;
    const description = container.firstChild.firstChild.data.trim();
    return description;
  }

  getPhoto(playlist) {
    const info = playlist(queries.photoQuery);
    const img = info.get(0).firstChild.children.find((x) => x.name === 'span');
    const photo = img.attribs.style.split('"')[1];
    return photo;
  }

  getPlatform() {
    return platforms.SOUNDCLOUD;
  }

  getTitle(playlist) {
    const info = playlist(queries.titleQuery);
    const titleSpan = info.get(0).children.find((x) => x.name === 'span');
    const title = titleSpan.firstChild.data.trim();
    return title;
  }

  getTracks(playlist) {
    const titles = playlist(queries.trackTitleQuery);
    const artists = playlist(queries.trackArtistQuery);
    const tracks = playlist(queries.trackQuery).slice(0, artists.length);

    if (titles.length !== artists.length)
      throw new Error('This playlist link seems invalid');

    const result = [];

    tracks.each((i, item) => {
      const track = {};

      let title = titles.get(i).firstChild.data.trim();
      title = title.replace(this.extraInfoRgx, '');

      const artist = artists.get(i).firstChild.data.trim();

      const info = title.split(this.trackSplitRgx);
      if (info.length > 1) {
        let possibleArtist = info[0];
        possibleArtist = possibleArtist.replace(this.featRgx, ', ');
        possibleArtist = possibleArtist.replace(' & ', ', ');

        // using regex in split keeps separator
        let possibleTitle = info[2];
        const splitIdxt = utils.indexOfRgx(possibleTitle, this.featRgx);
        possibleTitle = splitIdxt !== -1 ? possibleTitle.substring(0, splitIdxt) : possibleTitle;

        track.possibleArtist = possibleArtist;
        track.possibleTitle = possibleTitle;
      } else {
        track.possibleArtist = null;
        track.possibleTitle = null;
      }

      track.title = title;
      track.artist = artist;
      result.push(new SoundcloudTrack(track));
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

module.exports = SoundcloudPlaylistParser;
