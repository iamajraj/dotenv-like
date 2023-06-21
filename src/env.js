const fs = require('fs');
const path = require('path');

function init() {
  // get the current working directory
  const dir = process.cwd();

  // filepath for the .env
  const envPath = path.join(dir, '.env');

  // first check if the file exists
  if (fs.existsSync(envPath)) {
    const file = fs.openSync(envPath, 'r');
    const data = fs.readFileSync(file, {
      encoding: 'utf-8',
    });

    // split the file into lines
    const lines = data.split('\n');

    // loop through the lines for key and value
    lines.forEach((line) => {
      const split = line.split('=');

      // if not exists than return
      if (!split[0] || !split[1]) return;

      const key = split[0];

      // remove escape characters
      split[1] = split[1].trim().replace(/[^\w\s]/gi, '');

      // check if the value starts with `"` and ends with `"`
      const value =
        split[1].startsWith('"') && split[1].endsWith('"')
          ? split[1].slice(1, split[1].length - 1)
          : split[1];

      // finally set the environment variable
      process.env[key] = value;
    });
  }
}

module.exports = { init };
