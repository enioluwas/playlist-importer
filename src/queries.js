/**
 * Interface to standardize queries from different platforms
 * Currently only needed by Apple Music since its JSON response is
 * not complete.
 */
class PlaylistQuery {
  constructor(props) {
    this.counterInfo = props.counterInfo;
    this.authorQuery = props.authorQuery;
    this.descriptionQuery = props.descriptionQuery;
    this.photoQuery = props.photoQuery;
    this.trackQuery = props.trackQuery;
    this.trackTitleQuery = props.trackTitleQuery;
    this.trackArtistQuery = props.trackArtistQuery;
    this.titleQuery = props.titleQuery;
    this.trackIsExplicitQuery = props.trackIsExplicitQuery;
    this.trackLengthQuery = props.trackLengthQuery;
    this.telegraphedLengthQuery = props.telegraphedLengthQuery;
  }
}


const soundcloudQueries = new PlaylistQuery({
  counterInfo: {
    songCountClasses: 'genericTrackCount large m-active',
    eofClasses: 'paging-eof sc-border-light-top',
    trackClasses: 'trackItem__number sc-font-tabular' },
  authorQuery: '',
  descriptionQuery: '',
  photoQuery: '',
  trackQuery: 'trackList__item sc-border-light-bottom',
  trackTitleQuery: '',
  trackArtistQuery: '',
  titleQuery: '',
  trackIsExplicitQuery: '',
  trackLengthQuery: '',
  telegraphedLengthQuery: '',
});

const primeQueries = new PlaylistQuery({
  counterInfo: {
    initValue: '...',
    songCountClasses: 'viewSubDescription',
    trackClasses: 'playlistDetailsListItem' },
  authorQuery: 'div.viewSubDescription',
  descriptionQuery: 'h2.viewDescription',
  photoQuery: 'div.playlistHeaderArt',
  trackQuery: 'tr.playlistDetailsListItem',
  trackTitleQuery: 'td.title',
  trackArtistQuery: 'span.artist',
  titleQuery: 'h1.viewTitle',
  trackIsExplicitQuery: null,
  trackLengthQuery: 'div.listViewDuration',
  telegraphedLengthQuery: 'div.viewSubDescription',
});

const youtubeQueries = new PlaylistQuery({
  counterInfo: {
    songCountClasses: 'subtitle style-scope ytmusic-detail-header-renderer',
    trackClasses: 'flex-columns style-scope ytmusic-responsive-list-item-renderer' },
  authorQuery: '',
  descriptionQuery: '',
  photoQuery: 'div.',
  trackQuery: '',
  trackTitleQuery: '',
  trackArtistQuery: '',
  titleQuery: 'flex-columns style-scope ytmusic-responsive-list-item-renderer',
  trackIsExplicitQuery: '',
  trackLengthQuery: '',
  telegraphedLengthQuery: '',
});

module.exports = {
  soundcloudQueries,
  primeQueries,
  youtubeQueries,
  PlaylistQuery,
};
