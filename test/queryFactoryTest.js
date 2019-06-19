const { assert } = require('chai');
const queries = require('../src/queries');
const factory = require('../src/queryFactory');
const platforms = require('../src/platforms');

describe('queryFactory', () => {
  it('should return correct queries for each valid platform', () => {
    assert.deepEqual(factory.getQueries(platforms.SOUNDCLOUD), queries.soundcloudQueries);
    assert.deepEqual(factory.getQueries(platforms.PRIME), queries.primeQueries);
    assert.deepEqual(factory.getQueries(platforms.YOUTUBE), queries.youtubeQueries);
  });

  it('should return null for an unsupported platform', () => {
    const unsupported = [platforms.APPLE, platforms.PANDORA, platforms.SPOTIFY, 'myspace'];
    for (const platform of unsupported)
      assert.isNull(factory.getQueries(platform));
  });
});
