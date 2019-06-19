#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const importer = require('.');
const isValidFilename = require('valid-filename');

const asRed = (text) => chalk.red(text);
const asGreen = (text) => chalk.green(text);
const asBlue = (text) => chalk.blue(text);
const asYellow = (text) => chalk.yellow(text);

program
  .version('0.1.0')
  .option('-i --input <input>', 'hyperlink of the playlist to be imported (required)')
  .option('-o, --output <output>', 'Path to store the file in (default is current directory) (optional)')
  .option('-f, --filename <filename>', 'filename for the JSON output file (optional)')
  .parse(process.argv);

if (!process.argv.slice(2).length)
  program.outputHelp(asRed);


if (program.input) {
  importer.getPlaylistData(program.input)
    .then((data) => {
      let output = path.resolve(path.normalize('./'));
      let filename = 'importedPlaylist.json';

      if (program.output) {
        output = path.resolve(path.normalize(program.output));
        const stats = fs.statSync(output);
        if (stats.isFile() || stats.isSymbolicLink()) {
          console.log(`${asRed('Error: The provided output path is an invalid folder: ')}${asBlue(output)}`);
          process.exit(1);
        }
      }

      if (program.filename) {
        filename = program.filename;
        if (!isValidFilename(filename)) {
          console.log(`${asRed('Error: The provided filename is invalid: ')}${asBlue(filename)}`);
          process.exit(1);
        }
      }

      const completePath = `${output}${path.sep}${filename}`;
      if (fs.existsSync(completePath))
        console.log(asYellow(`Warning: The provided filename exists and will be overwritten.`));

      fs.writeFile(completePath, JSON.stringify(data, null, 2), (error) => {
        if (null !== error) {
          console.log(asRed(`Error: ${error.message}`));
          process.exit(1);
        }
        console.log(asGreen(`Success: Imported playlist successfully written to ${asBlue(completePath)}`));
      });
    })
    .catch((error) => {
      console.log(asRed(`Error: ${error.message}`));
    });
}
