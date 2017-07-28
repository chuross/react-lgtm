/**
* Reactを触りたいだけなので雑に作る(気が向いたらちゃんと作る)
*/

const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cors = require('cors');
const multer  = require('multer');
const configs = require('config');

const baseUrl = configs.baseUrl;
const port = process.env.PORT || 3000;
const mongoRequireAuth = process.env.MONGODB_AUTH || 'false';
const mongoHost = configs.mongoHost || 'mongo';
const mongoPort = configs.mongoPort || 27017;
const mongoUser = configs.mongoUser || 'root';
const mongoPW = configs.mongoPW || '';

const maxFileSize = process.env.MAX_FILE_SIZE || 1 * 1000 * 1000; // 1M

const app = express();
app.listen(port, () => console.log(`launch server port=${port}`));

if (mongoRequireAuth == 'true') {
  mongoose.connect(`mongodb://${mongoUser}:${mongoPW}@${mongoHost}:${mongoPort}/lgtm`, { useMongoClient: true });
} else {
  mongoose.connect(`mongodb://${mongoHost}/lgtm`, { useMongoClient: true });
}

const Image = mongoose.model('image', new Schema({
  id: { type: String, required: true, unique: true },
  mimeType: { type: String, required: true },
  size: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}));

const delegate = (res, callback) => {
  return callback(null, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  });
};

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

app.use(cors(delegate));

app.get('/', (req, res) => {
  res.json(getResult('welcome'));
});

app.get('/uploads', (req, res) => {
  Image.find({}, {}, {
    sort: { createdAt: -1 },
    skip: req.query.offset || 0,
    limit: req.query.limit || 20
  }).exec().then(images => {
    res.json(getResult(images.map(image => ({
      id: image.id,
      size: image.size,
      url: `${baseUrl}/uploads/${image.id}/raw`
    }))));
  }).catch(err => {
    console.log(err);
    res.json(getResult('取得に失敗しました'));
  });
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
        url: `${baseUrl}/uploads/${filename}/raw`
      }));
    })
    .catch(err => {
      console.log(err);
      res.json(getResult('アップロードに失敗しました'));
    });
});

app.get('/uploads/:id', (req,  res) => {
  Image.findOne({ id: req.params.id }).exec()
    .then(image => {
      res.json(getResult({
        id: image.id,
        size: image.size,
        url: `${baseUrl}/uploads/${image.id}/raw`
      }))
    }).catch(err => {
      console.log(err);
      res.json(getResult('取得に失敗しました'));
    });
});

app.delete('/uploads/:id', (req, res) => {
  Image.remove({ id: req.params.id }).exec()
    .then(() => fs.unlinkSync(path.resolve(`uploads/${req.params.id}`)))
    .then(() => res.json(getResult(true)))
    .catch(err => {
      console.log(err);
      res.send(getResult('削除に失敗しました'));
    });
});

app.get('/uploads/:id/raw', (req, res) => {
  Image.findOne({ id: req.params.id }).exec()
    .then(image => {
      const data = fs.readFileSync(path.resolve(`uploads/${image.id}`));
      res.set('Content-Type', image.mimeType).end(new Buffer(data), 'binary');
    }).catch(err => {
      console.log(err);
      res.status(404).send('');
    });
});
