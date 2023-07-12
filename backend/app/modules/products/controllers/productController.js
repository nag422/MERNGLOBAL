const axios = require("axios");

const getProducts = async (req, res, next) => {
  axios
    .get("https://dummyjson.com/products")
    .then((response) => {
       res.status(201).json(response.data)
    })
    .catch((error) => {
       res.status(400).json({message: "Something is went wrong"})
    })
};

module.exports = {
  getProducts,
};
