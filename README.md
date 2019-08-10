# playlist-importer

npm package to parse playlist links from common music platforms to JSON.

## Motivation

I created this as more of a general use extension of a small module I made when I was working on a website to import playlists from other platforms to Spotify. This package does not use any platform-specific APIs to get playlists' data. It simply parses the webpages for the desired data and formats it. If I were to use the APIs provided by each platform it supports, then I would not make this public to control the use of my client ID/secrets.

## Supported Platforms

- Spotify
- Apple Music
- Pandora
- Prime Music
- Soundcloud
- Youtube Music

## Installation

```npm install playlist-importer```

### Note

This package makes use of [Selenium](https://github.com/SeleniumHQ/selenium) and [Chromedriver](https://github.com/giggio/node-chromedriver) and thus requires Chrome Version 76 installed in the default directory. This is required to support parsing data from Prime, Soundcloud and Youtube Music as simple GET requests will not do. If you want support for the other platforms but without the Chrome dependency, use the [lite version](https://github.com/enioluwa23/playlist-importer-lite).

## Usage

### CLI

This app provides a binary that can import playlist data to a JSON file from a provided link

```text
Usage: playlist-importer [options]

Options:
  -V, --version              output the version number
  -i --input <input>         hyperlink of the playlist to be imported (required)
  -o, --output <output>      Path to store the file in (default is current directory) (optional)
  -f, --filename <filename>  filename for the JSON output file (optional)
  -h, --help                 output usage information
```

### Example

```playlist-importer -i https://open.spotify.com/user/spotify/playlist/37i9dQZF1DXcBWIGoYBM5M -o ./myImportedPlaylists -f spotifyTodayTopHits```

### Programmatic

```js
const importer = require('playlist-importer');

importer.getPlaylistData('https://open.spotify.com/user/spotify/playlist/37i9dQZF1DXcBWIGoYBM5M')
  .then((data) => {
    console.log(data);
  });
```

Note that the method `getPlaylistData` is asynchronous and therefore should be either uses with async/await or used as a `Promise` like above.

### Output

From the request above we can get a full view of the JSON output schema. Only the first track is shown here.

```json
{
  "author": "Spotify",
  "title": "Today's Top Hits",
  "description": "Shawn Mendes is on top of the Hottest 50!",
  "platform": "Spotify",
  "photo": "https://pl.scdn.co/images/pl/default/d7b968d316733edc4308cfdb0eebd7c7c3dfe47c",
  "tracklist": [
    {
      "title": "Cross Me",
      "artist": "Ed Sheeran, Chance the Rapper, PnB Rock",
      "length": 206.186,
      "isExplicit": true
    }
  ]
}
```

## API

- `ImporterStatic.getPlaylistData(url: string): object` - returns JSON data.
- `ImporterStatic.getPlatform(url: string): string|null` - returns the platform, one of `['Apple Music', 'Spotify', 'Pandora']` or `null`

Note that the length of each track is given in seconds. Artists are separated by a comma and a space.

## Contributing

Recommended IDE is VS Code. Submit issues/pull requests here.

Run tests using `npm test`

Install CLI to test using `npm link`

The [TODO](./TODO) file is a good place to start.

## License

MIT
