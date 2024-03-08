const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const route = require("../server/route/Route.js");
// const Route = require("../server/route/reminderList.js");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require ("./database/Db.js");
const port = 8000;

require("./model/User.js");


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/api',route);
app.use('/api2',route);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
