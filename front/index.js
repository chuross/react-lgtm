const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();
app.listen(port, () => console.log(`launch server port=${port}`));

app.use(express.static('public'));
