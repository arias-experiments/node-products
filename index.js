const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./database');
const productRoutes = require('./routes/products');

app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/products', productRoutes);

app.listen(8001, () => {
    console.log('Server started! Listening on 8001');
});