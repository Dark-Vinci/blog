const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
require('./appManager')(app);

const port = process.env.PORT || 2021;
app.listen(port , () => console.log(`listening on port ${ port }`));