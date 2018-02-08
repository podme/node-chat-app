const path = require('path');
const publicPath = path.join(__dirname, '../public');//so we can go directly, rather than in and out again as before with __dirname + '/../public'

const express = require('express');
var app = express();

app.use(express.static(publicPath));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('Server up: http://localhost:' + app.get('port'));
});