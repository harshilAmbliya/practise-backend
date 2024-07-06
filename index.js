const express = require('express');
const app = express();
const port = 8010;
require("dotenv").config()
const routes = require("./routes/index")
const bodyParser = require('body-parser');

require("./db/db")
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({extends:true}));


app.use('/api', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});