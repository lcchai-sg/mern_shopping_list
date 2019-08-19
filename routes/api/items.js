const express = require('express');
const router = express.Router();

// item model
const Item = require('../../models/item');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
  try {
    let result = await Item.find().sort({ date: -1 });
    res.status(200).json(result);
  } catch (err) {
    console.log('Item GET error: ', err);
    res.status(500).json({ error: err });
  }
});

// @route   POST api/items
// @desc    Create an item
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
    });
    let result = await newItem.save();
    res.status(201).json(result);
  } catch (err) {
    console.log('Item POST error: ', err);
    res.status(500).json({ error: err });
  }
});

// @route   DELETE api/items
// @desc    Delete an item
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    let result = await Item.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
      res.status(201).json({
        message: 'Item deleted',
        count: result.deletedCount,
        result,
      });
    } else {
      res.status(401).json({
        message: "Data not found",
        result,
      });
    }
  } catch (err) {
    console.log('Item DELETE error: ', err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;