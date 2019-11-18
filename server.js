// SCI ID: 050
// Name: index
// Version: 1.1

const express = require('express');
const markdownpdf = require('markdown-pdf');
const fs = require('fs');
const app = express();

// Request body is converted to json format
app.use(express.json());

// Necessary for debugging but not sure if needed in production.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/pdf', (req, res) => {

  const fileName = req.body.title + ".pdf";
  markdownpdf().from.string(req.body.content).to(fileName, () => {
    res.download(fileName, (err) => {
      if (err) {
        console.error("File transfer failure.");
        console.log(err);
      } else {
        // Delete file when finished
        fs.unlink(fileName, (err) => {
          if (err) console.log(err);
        })
      }
    });
  })
})

app.listen(process.env.PORT || 3000, () => console.log("Server Running"));
