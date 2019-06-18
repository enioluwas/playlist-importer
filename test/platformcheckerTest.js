const { expect } = require('chai');
const checker = require('../src/platformChecker');

describe('platformChecker', () => {
  describe('isApple', () => {
    it('should return true for valid link', () => {
      const urls = [
        'https://itunes.apple.com/us/playlist/the-a-list-african-music/pl.a0794db8bc6f45888834fa708a674987',
        'https://music.apple.com/us/playlist/for-eni/pl.u-8aAVXEeIoXao3z4',
      ];

      for (const url of urls)
        expect(checker.isApple(url)).to.eql(true);
    });
    it('should return false for invalid link', () => {
      const urls = [
        'https://itunes.apple.com/us/untitled-playlist/pl.u-z',
      ];

      for (const url of urls)
        expect(checker.isSoundcloud(url)).to.eql(false);
    });
  });
  describe('isSpotify', () => {
    it('should return true for valid link', () => {
      const urls = [
        'https://open.spotify.com/playlist/2n8POxkiNjLibFSTwe4u7p',
        'https://open.spotify.com/playlist/4XMzwJePdl7QRU2q0xe7iL?si=jQM5kk3VTEWNhsFfn-FUZg',
      ];

      for (const url of urls)
        expect(checker.isSpotify(url)).to.eql(true);
    });
    it('should return false for invalid link', () => {
      const urls = [
        'https://itunes.apple.com/us/untitled-playlist/pl.u-z',
      ];

      for (const url of urls)
        expect(checker.isYouTubeMusic(url)).to.eql(false);
    });
  });
  describe('isPandora', () => {
    it('should return true for valid link', () => {
      const urls = [
        'https://www.pandora.com/playlist/PL:13538199:568893875',
        'https://www.pandora.com/genre/rap-and-hip-hop-pre-game',
      ];

      for (const url of urls)
        expect(checker.isPandora(url)).to.eql(true);
    });
    it('should return false for invalid link', () => {
      const urls = [
        'https://www.pandora.com/rap-and-hip-hop-pre-game',
      ];

      for (const url of urls)
        expect(checker.isPandora(url)).to.eql(false);
    });
  });
  describe('isYouTubeMusic', () => {
    it('should return true for valid link', () => {
      const urls = [
        'https://music.youtube.com/playlist?list=RDCLAK5uy_k2pS49OPwSZtJeXgWnvAPmlB8gJCphDes',
      ];

      for (const url of urls)
        expect(checker.isYouTubeMusic(url)).to.eql(true);
    });
    it('should return false for invalid link', () => {

    });
  });
  describe('isSoundcloud', () => {
    it('should return true for valid link', () => {
      const urls = [
        'https://soundcloud.com/james-vanho/sets/melodic-dubstep',
      ];

      for (const url of urls)
        expect(checker.isSoundcloud(url)).to.eql(true);
    });
    it('should return false for invalid link', () => {
      const urls = [
        'https://soundcloud.com/james-vanho/melodic-dubstep',
      ];

      for (const url of urls)
        expect(checker.isSoundcloud(url)).to.eql(false);
    });
  });
  describe('isPrimeMusic', () => {
    it('should return true for valid link', () => {
      const urls = [
        'https://music.amazon.com/playlists/B07R5CN9D1',
        'https://music.amazon.com/user-playlists/7b4b6d204bd3437e9ae59d8ea449a816sune',
      ];

      for (const url of urls)
        expect(checker.isPrimeMusic(url)).to.eql(true);
    });
    it('should return false for invalid link', () => {
      const urls = [
        'https://music.amazon.com//B07R5CN9D1',
        'https://music.amazon.com/user/7b4b6d204bd3437e9ae59d8ea449a816sune',
      ];

      for (const url of urls)
        expect(checker.isPrimeMusic(url)).to.eql(false);
    });
  });
});
