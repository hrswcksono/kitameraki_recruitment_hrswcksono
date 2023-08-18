const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const route = require("./routes");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(route);
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
