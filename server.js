// SCI ID: 050
// Name: index
// Version: 1.1

const express = require('express');
const markdownpdf = require('markdown-pdf');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {

  const fileName = req.body.title + ".pdf";
  markdownpdf().from.string(req.body.content).to(fileName, () => {
    res.download(fileName, (err) => {
      if (err) {
        console.error("File transfer failure.");
      } else {
        fs.unlink(fileName, (err) => {
          if (err) console.log(err);
        })
      }
    });
  })

})

app.listen(3000, () => console.log("Server Running"));
