const express = require('express');
const path = require('path');

const app = express();

app.use('/widget', express.static(path.join(__dirname, '../dist')))
app.use('/', express.static(path.join(__dirname, 'container')));

app.listen(3000, () => {
    console.log("Widget live on http://localhost:3000");
});
