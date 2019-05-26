class Playlist {
  constructor(props) {
    this.author = props.author;
    this.title = props.title;
    this.description = props.description;
    this.platform = props.platform;
    this.photo = props.photo;
    this.tracklist = props.tracklist;
  }
}

module.exports = Playlist;
