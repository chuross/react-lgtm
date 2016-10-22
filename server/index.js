var express = require('express');
var multer  = require('multer');

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

app.post('/upload', upload.single('file'), (req, res) => {
});
