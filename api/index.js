const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multer  = require('multer');

const baseUrl = process.env.BASE_URL;
const port = process.env.PORT || 3000;
const mongoHost = process.env.MONGODB_HOST || 'mongo';
const maxFileSize = process.env.MAX_FILE_SIZE || 1 * 1000 * 1000; // 1M

const app = express();
app.listen(port, () => console.log(`launch server port=${port}`));

mongoose.connect(`mongodb://${mongoHost}/lgtm`);
const Image = mongoose.model('image', new Schema({
  id: { type: String, required: true, unique: true },
  mimeType: { type: String, required: true },
  size: { type: Number }
}));

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

app.post('/uploads', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json(getResult('ファイルがアップロードされていません'));
    return;
  }

  const { filename, size, mimetype } = req.file;

  const image = new Image();
  image.id = filename;
  image.size = size;
  image.mimeType = mimetype;

  image.save()
    .then(Image.findOne({ id: image.id }).exec())
    .then(result => {
      res.json(getResult({
        id: result.id,
        size: result.size,
        url: `${baseUrl}/uploads/${filename}`
      }));
    })
    .catch(err => {
      res.json(getResult('アップロードに失敗しました'));
    });
});

app.get('/uploads/:id', (req,  res) => {
  Image.findOne({ id: req.params.id }).exec()
    .then(image => {
      const data =fs.readFileSync(path.resolve(`uploads/${image.id}`));
      res.set('Content-Type', image.mimeType).end(new Buffer(data), 'binary');
    })
    .catch(err => res.status(404).json(getResult('画像がありません')));
});
