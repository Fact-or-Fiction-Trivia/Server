const fs = require("fs");
const { parse } = require("csv-parse");

async function parseData(fileData) {
  return new Promise((resolve, reject) => {
    parse(fileData, { columns: false, trim: true }, function (err, rows) {
      if (err) {
        reject(err);
      }
      const rawQuestions = {};
      const rawTags = new Set();
      for (let i = 1; i < rows.length; i++) {
        const [tagsWithComma, text, answer, source, explanation, expiration] =
          rows[i];
        const tags = tagsWithComma.split(", ");
        rawTags.add(...tags);
        rawQuestions[i] = {
          tags,
          text,
          answer,
          source,
          explanation,
          expiration,
        };
      }
      resolve({ rawQuestions, rawTags });
    });
  });
}

async function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + "/questions.csv", async function (err, fileData) {
      if (err) {
        reject(err);
      }
      data = await parseData(fileData);
      resolve(data);
    });
  });
}

const main = async () => {
  const data = await readFile();
  return data;
};

module.exports = main;
