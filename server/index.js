var express = require('express')
var multer  = require('multer')

var app = express();
var upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), function(req, res) {
});
