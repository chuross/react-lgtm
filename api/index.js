const fs = require('fs');
const path = require('path');
const express = require('express');
const multer  = require('multer');

const port = process.env.PORT || 3000;
const maxFileSize = process.env.MAX_FILE_SIZE = 1 * 1000 * 1000; // 1M

const app = express();
app.listen(port, () => console.log(`launch server port=${port}`));

const upload = multer({
  dest: 'uploads/',
  limists: {
    fileSize: maxFileSize,
    files: 1
  }
});

function getResult(payload) {
  return { result: payload };
}

app.get('/', (req, res) => {
  res.json(getResult('welcome'));
});

app.get('/uploads/:fileName', (req,  res) => {
  const data =fs.readFileSync(path.resolve(`uploads/${req.params.fileName}`));
  res.end(new Buffer(data), 'binary');
});

app.post('/uploads', upload.single('file'), (req, res) => {
  res.send(getResult({
    url: `http://localhost:3000/uploads/${req.file.filename}`
  }));
});
