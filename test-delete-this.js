// const SoundcloudPageLoader = require('./src/soundcloudPageLoader');
// const YoutubePageLoader = require('./src/youtubePageLoader');
// const PrimePageLoader = require('./src/primePageLoader');
const fs = require('fs');
// const queries = require('./src/queries');

// console.time('browse');
// const browser = new PrimePageLoader(queries.primeQueries.counterInfo);
// browser.visit('https://music.amazon.com/playlists/B07KXS3DKR')
//   .then(async () => {
//     const source = await browser.getPageSource();
//     fs.writeFileSync('./assets/primeeexample.html', source);
//     await browser.quit();
//     console.timeEnd('browse');
//   }).catch((error) => {
//     console.log(error);
//     console.timeEnd('browse');
//   });

// https://music.youtube.com/playlist?list=PLFgquLnL59anX9MlB94jIg69rR6FyzqQP
// https://soundcloud.com/james-vanho/sets/melodic-dubstep


const importer = require('.');
importer.getPlaylistData('https://music.youtube.com/playlist?list=RDCLAK5uy_k2pS49OPwSZtJeXgWnvAPmlB8gJCphDes')
  .then((data) => {
    fs.writeFileSync('./assets/youtubeexample.json', JSON.stringify(data, null, 2));
  });

