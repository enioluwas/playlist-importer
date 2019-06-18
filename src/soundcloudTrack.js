const Track = require('./track');

class SoundcloudTrack extends Track {
  constructor(props) {
    super(props);
    this.possibleTitle = props.possibleTitle;
    this.possibleArtist = props.possibleArtist;
  }
}

module.exports = SoundcloudTrack;
