
const express = require("express");
var cors = require('cors');

const app = express();
app.use(cors());
app.disable('etag');

var cars = require('./mocks/carsList.json');
app.get("/url", (req, res, next) => {
  res.json(cars.cars);
});

app.listen(8000, () => {
  console.log('Server started!');
});