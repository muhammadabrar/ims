
const mongoose = require('mongoose');
// let Exercise = require('./models/model');
require('dotenv').config();

const { spawn } = require('child_process');
const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
var cors = require('cors');
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors())
app.set('views', __dirname + '/views/');
app.use(express.static(process.cwd() + '/views'));
app.use(bodyParser.json());
router.get('/', (req, res) => {
    res.render('static/index');
});

 
// mongoose.set('strictQuery', false);

//database=============================================================
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error", err));
mongoose.connect(uri, { }
);


//database=============================================================


//routers??????????????????????????????????????????//////////////////////////////////////////

let ordersRoutes = require("./routes/orders")

app.use('/api/orders', ordersRoutes)

let InventoryRoutes = require("./routes/Inventory")

app.use('/api/Inventory', InventoryRoutes)

let customerRoutes = require("./routes/customer")

app.use('/api/customer', customerRoutes)

app.listen(process.env.port || 5000);

// console.log('Web Server is listening at port http://localhost:' + (process.env.port || 5000));