
const express = require('express');
product = require('../models/product');
const router = express.Router();
Product = require('../models/product');

function HandleError(response, reason, message, code){
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
}

router.get('/', (request, response, next) => {

    Product.find({}).then((products) => {
        response.send(products);
    }).catch((error) => {
        HandleError(response, "Error retrieving data", "GET failed", 500);
    });

});

router.post('/', (request, response) => {
    const productJSON = request.body;
    if (!productJSON.name || !productJSON.price){
        HandleError(response, "Missing Info", "POST Data Missing", 500);
    }else {
        product = new Product({
            name: productJSON.name,
            price: productJSON.price,
            category: productJSON.category
        });
        product.save().then((result) => {
            response.send({"id": result._id});
        }).catch((error) => {
            HandleError(response, error.message, "Failed to create new product.");
        });
        // product.save((error, result) => {
        //     if(error){
        //         HandleError(response, error.message, "Failed to create new product.");
        //     }else{
        //         response.send({"id": result._id});
        //     }
        // });
    }
});

module.exports = router;