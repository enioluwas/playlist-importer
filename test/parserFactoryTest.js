const { assert } = require('chai');
const SoundcloudPlaylistParser = require('../src/soundcloudPlaylistParser');
const PrimePlaylistParser = require('../src/primePlaylistParser');
const YoutubePlaylistParser = require('../src/youtubePlaylistParser');
const factory = require('../src/parserFactory');
const platforms = require('../src/platforms');

describe('parserFactory', () => {
  it('should return correct parser for each valid platform', () => {
    assert.instanceOf(factory.getParser(platforms.SOUNDCLOUD), SoundcloudPlaylistParser);
    assert.instanceOf(factory.getParser(platforms.PRIME), PrimePlaylistParser);
    assert.instanceOf(factory.getParser(platforms.YOUTUBE), YoutubePlaylistParser);
  });

  it('should return null for an unsupported platform', () => {
    const unsupported = [platforms.APPLE, platforms.PANDORA, platforms.SPOTIFY];
    for (const platform of unsupported)
      assert.isNull(factory.getParser(platform));
  });
});
