const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

//initialize .env
dotenv.config();

//initialize body parser middleware of express
app.use(express.urlencoded({ extended: false }));

//json rep middleware
app.use(express.json());

//routing middleware
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);

//middleware for static folder
//const __dirname = path.resolve();
app.use('uploads/', express.static(path.join(__dirname, '/uploads'))); //dirname gives cureent directory

const { notFound, errorHandler } = require('./middleware/errMiddleware');
//errorhandling middleware
app.use(notFound);
app.use(errorHandler);

//database models sync with table
const db = require('./models/index');

db.sequelize
  .sync()
  .then(() => {
    app.listen(5000, console.log('Server Running on port 5000'));
  })
  .catch((err) => console.error(err));
