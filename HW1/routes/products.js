const express = require('express');
const router = express.Router();
const path = require('path');

const data = require('../data');
const errorPage = "/Users/nave/Documents/nodeJS/simpleRouterNode/simpleRouterNode/404.html";


console.log(__dirname);
// GET /api/products
router.get('/', (req, res) => {
  res.json(data.products);
});


// GET /api/products/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const prod = data.products.find(item => item.id === Number(id));
  if (prod) {
    res.json(prod);
  } else {
    res.status(404).sendFile(errorPage);
  }
});

// POST /api/products
router.post('/products', (req, res) => {
  const { id, name, price, stock } = req.body;

  if ((id && name && price > 0 && stock > 0)) {
    data.products.push({ id, name, price });
    res.status(201).json({ message: 'product added' });
  } else {
    res.status(404).json({ message: 'Product missing value' });
  }
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  const prodInd = data.products.findIndex(item => item.id === Number(id));
  if (prodInd !== -1) {
    if (id && name && price > 0 && stock > 0) {
      data.products[prodInd] = { id, name, price };
      console.log(data.products);
      res.status(201).json({ message: 'product updated' });
    }
  }
  else {
    res.status(404).sendFile(errorPage);
  }
  res.json({ message: `Product with ID: ${id} updated` });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const prodInd = data.products.findIndex(item => item.id === Number(id));
  if (prodInd !== -1) {
    data.products.splice(prodInd, 1);
    console.log(data.products.length);
    console.log(data.products);
    res.status(201).json({ message: 'product deleted' });
  }
  else {
    res.status(404).sendFile(errorPage);
  }
});

module.exports = router;