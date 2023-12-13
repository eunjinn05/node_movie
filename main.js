const express = require('express');
const app = express();

const router = require('./movie');
app.use('/movie', router);

app.set('view engine', 'pug');
app.use('/public', express.static('src'));
app.set('views', 'src/views');

const PORT = 3000;
app.listen(PORT, () => {
    console.log('SERVER ' + PORT + ' ON');
});
