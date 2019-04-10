const express = require('express');
const markdownpdf = require('markdown-pdf');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  // Read from markdown file and create pdf file
  const converter = fs.createReadStream('test.md')
    .pipe(markdownpdf())
    .pipe(fs.createWriteStream('test.pdf'));

  // Send the file as a response once closed.
  converter.on('close', () => {
    res.download('test.pdf');
  })
})

app.listen(3000, () => console.log("Server Running"));
