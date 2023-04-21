const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

var usersRouter = require('./routes/users');
var captionRoute = require('./routes/caption.route');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/users', usersRouter);
app.use('/api/caption',captionRoute );


//index.js
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

app.listen(process.env.PORT || 3000);

module.exports = app