process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
// Ensure environment variables are read.
require("../config/env");
require("es6-promise").polyfill();
require("isomorphic-fetch");

const fs = require("fs-extra");
const Papa = require("papaparse");
const tempFile = "./src/lib/utils/device-list.txt";
const srcFile = "./src/lib/utils/device-list.js";
const inputEncoding = "utf16le";
const outputEncoding = "utf8";

fetch("http://storage.googleapis.com/play_public/supported_devices.csv", {
  method: "GET",
  headers: {
    "Content-Type": "text/csv"
  }
})
  .then(resp => {
    resp.body
      .pipe(fs.createWriteStream(tempFile))
      .on("close", () => console.log("csv downloaded"));
    return resp.text();
  })
  .then(csvStr => {
    fs.readFile(tempFile, inputEncoding, (err, data) => {
      if (err) throw err;

      var parsedCsv = Papa.parse(data, {
        encoding: inputEncoding,
        skipEmptyLines: true,
        beforeFirstChunk: chunk => {
          var rows = chunk.split(/\r\n|\r|\n/);
          var headers = rows[0].split(",");
          var headings = [];
          // var items = [];
          headers.forEach(element => {
            let test = element.split(" ");
            if (test.length > 1) {
              headings.push(test[test.length - 1].toLowerCase());
            } else {
              headings.push(test[0].toLowerCase());
            }
          });
          rows[0] = headings.join(",");

          /*rows.forEach(element => {
            let testRow = element.split(",");
            let include = true;
            testRow.forEach(rowItem => {
              if (!!!rowItem.length) include = false;
            });
            if (include) items.push(testRow.join(","));
          });*/
          return rows.join("\r\n");
        },
        header: true
      });
      fs.writeFile(
        srcFile,
        `const AndroidDeviceList = ${JSON.stringify(parsedCsv.data)}
        
        export default AndroidDeviceList;
        `,
        {
          encoding: outputEncoding
        },
        function(err) {
          if (err) throw err;
          console.log("JSON file is ready!");
        }
      );
    });
  });
