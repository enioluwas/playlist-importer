const chai = require('chai');
const chaiAsync = require('chai-as-promised');
chai.use(chaiAsync);
const { assert, expect } = chai;
const importer = require('../src/playlistImporter');
const platforms = require('../src/platforms');


describe('playlistImporter', () =>{
  describe('getPlatform', () => {
    it('should identify correct platforms', () => {
      const soundcloudUrl = 'https://soundcloud.com/james-vanho/sets/melodic-dubstep';
      const primePUrl = 'https://music.amazon.com/user-playlists/7b4b6d204bd3437e9ae59d8ea449a816sune';
      const primeGUrl = 'https://music.amazon.com/playlists/B07KXS3DKR';
      const youtubeUrl = 'https://music.youtube.com/playlist?list=RDCLAK5uy_kWm5me-X3IbEMBOWHd2fI7d4aQoauMcbI';

      expect(importer.getPlatform(soundcloudUrl)).to.eql(platforms.SOUNDCLOUD);
      expect(importer.getPlatform(primePUrl)).to.eql(platforms.PRIME);
      expect(importer.getPlatform(primeGUrl)).to.eql(platforms.PRIME);
      expect(importer.getPlatform(youtubeUrl)).to.eql(platforms.YOUTUBE);
    });

    it('should throw for invalid platforms', () => {
      const invalidSoundcloudUrl = 'https://soundcloud.com/james-vanho/melodic-dubstep';
      const invalidPrimePUrl = 'https://music.amazon.com/user/7b4b6d204bd3437e9ae59d8ea449a816sune';
      const invalidPrimeGUrl = 'https://music.amazon.com//B07R5CN9D1';
      const invalidYoutubeUrl = 'https://music.youtube.com/playlist/RDCLAK5uy_k2pS49OPwSZtJeXgWnvAPmlB8gJCphDes';
      const genericInvalidUrl = 'https://github.com/enioluwa23';

      expect(importer.getPlatform(invalidSoundcloudUrl)).to.eql(null);
      expect(importer.getPlatform(invalidPrimePUrl)).to.eql(null);
      expect(importer.getPlatform(invalidPrimeGUrl)).to.eql(null);
      expect(importer.getPlatform(invalidYoutubeUrl)).to.eql(null);
      expect(importer.getPlatform(genericInvalidUrl)).to.eql(null);
    });
  });

  describe('getPlaylistData', () => {
    it('should throw for invalid link', async () => {
      const url = 'https://open.spotify.com/2n8POxkiNjLibFSTwe4u7p';
      await assert.isRejected(importer.getPlaylistData(url), Error, 'Invalid/unrecognized playlist link');
    });

    it('should throw for valid links from platforms with base package support', async () => {
      const baseSupportedUrls = [];
      baseSupportedUrls.push(['https://music.apple.com/us/playlist/for-eni/pl.u-8aAVXEeIoXao3z4', platforms.APPLE]);
      baseSupportedUrls.push(['https://open.spotify.com/playlist/2n8POxkiNjLibFSTwe4u7p', platforms.SPOTIFY]);
      baseSupportedUrls.push(['https://www.pandora.com/playlist/PL:13538199:568893875', platforms.PANDORA]);

      for (const url of baseSupportedUrls) {
        await assert.isRejected(importer.getPlaylistData(url[0]), Error,
          `Use the playlist-importer package instead for ${url[1]} playlists`);
      }
    });

    it('should import soundcloud playlist correctly', async () => {
      const url = 'https://soundcloud.com/enioluwa-segun/sets/dub';
      const expected = {
        author: 'Enioluwa Segun',
        title: 'Dub',
        description: 'A dubstep playlist',
        platform: 'Soundcloud',
        photo: 'https://i1.sndcdn.com/artworks-000030523264-vgeu0w-t500x500.jpg',
        tracklist: [
          {
            title: 'Skrillex - Make It Bun Dem (Candyland Remix)',
            artist: 'Candyland',
            possibleTitle: 'Make It Bun Dem (Candyland Remix)',
            possibleArtist: 'Skrillex',
            isExplicit: undefined,
            length: undefined,
          },
          {
            title: 'Skrillex - Scary Bolly Dub',
            artist: 'Skrillex',
            possibleTitle: 'Scary Bolly Dub',
            possibleArtist: 'Skrillex',
            isExplicit: undefined,
            length: undefined,
          },
          {
            title: 'L.M. - Dimensions',
            artist: 'L.M.',
            possibleTitle: 'Dimensions',
            possibleArtist: 'L.M.',
            isExplicit: undefined,
            length: undefined,
          },
          {
            title: 'Tristam - Truth (Erio Remix)',
            artist: 'Erio',
            possibleTitle: 'Truth (Erio Remix)',
            possibleArtist: 'Tristam',
            isExplicit: undefined,
            length: undefined,
          },
        ],
      };
      const result = await importer.getPlaylistData(url);
      assert.deepEqual(result, expected);
    });

    it('should import prime playlist correctly', async () => {
      const url = 'https://music.amazon.com/user-playlists/7b4b6d204bd3437e9ae59d8ea449a816sune';
      const expected = {
        author: 'E S',
        title: 'hip',
        description: null,
        platform: 'Amazon Prime Music',
        photo: 'https://m.media-amazon.com/images/I/81A9Uyrhu8L._US2800_BL50_BG34,34,34_CLa%7C2800,2800%7C81A9Uyrhu8L.jpg,71x-EpLQ8bL.jpg,815p0vYftKL.jpg,71dOHrJD2GL.jpg%7C0,0,2800,2800+0,0,1400,1400+1400,0,1400,1400+0,1400,1400,1400+1400,1400,1400,1400_AA256_.jpg',
        tracklist: [
          {
            title: 'Celebrate',
            artist: 'DJ Khaled, Travis Scott, Post Malone',
            length: 206,
            isExplicit: false,
          },
          {
            title: 'CHopstix',
            artist: 'Schoolboy Q, Travis Scott',
            length: 181,
            isExplicit: true,
          },
          {
            title: 'The London',
            artist: 'Young Thug, J. Cole, Travis Scott',
            length: 200,
            isExplicit: true,
          },
          {
            title: 'Money In The Grave',
            artist: 'Drake, Rick Ross',
            length: 205,
            isExplicit: true,
          },
        ],
      };
      const result = await importer.getPlaylistData(url);
      assert.deepEqual(result, expected);
    });

    it('should import youtube playlist correctly', async () => {
      const url = 'https://music.youtube.com/playlist?list=PL95w6cQ_ViuIKAt8s2vyIacDiGfBiP4M7';
      const expected = {
        author: 'Enioluwa Segun',
        title: 'Future Bass',
        description: 'Immerse yourself in futuristic synths.',
        platform: 'Youtube Music',
        photo: 'https://lh3.googleusercontent.com/kGLSILBP4r31pPXrYkdBrjzUUOlrGxHS3sIjB6oQO721fsHbOQWev1SW8IaxTHII7IdqANuzJx5qECe8gA=w302-h302-l90-rj',
        tracklist: [
          {
            title: 'Luv U Giv (NGHTMRE Remix)',
            artist: 'Tommy Trash',
            length: 221,
            isExplicit: false,
          },
          {
            title: 'Kodokushi (VIP)',
            artist: 'Mihka! X Kyoto Black',
            length: 201,
            isExplicit: false,
          },
          {
            title: 'Ember Island - Need You (Not Your Dope X Jakoban Remix)',
            artist: 'Trap Nation',
            length: 246,
            isExplicit: false,
          },
          {
            title: 'Stay For A While',
            artist: 'Virtual Riot',
            length: 199,
            isExplicit: false,
          },
          {
            title: 'Flutter',
            artist: 'Virtual Riot',
            length: 178,
            isExplicit: false,
          },
        ],
      };

      const result = await importer.getPlaylistData(url);
      assert.deepEqual(result, expected);
    });
  }).timeout(10000);
});
