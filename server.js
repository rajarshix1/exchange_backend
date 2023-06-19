const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
require("dotenv").config()
const cors = require('cors');
const PORT = process.env.PORT || 3010;

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database!');
});
routes(app)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
