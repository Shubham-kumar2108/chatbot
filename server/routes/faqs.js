const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');
const auth = require('../middleware/auth');

// Public: GET all
router.get('/', async (req, res) => {
  const faqs = await FAQ.find().sort({ createdAt: -1 });
  res.json(faqs);
});

// Protected: POST create
router.post('/', auth, async (req, res) => {
  const { question, answer, tags } = req.body;
  const faq = new FAQ({ question, answer, tags });
  await faq.save();
  res.status(201).json(faq);
});

// Protected: PUT update
router.put('/:id', auth, async (req, res) => {
  const { question, answer, tags } = req.body;
  const faq = await FAQ.findByIdAndUpdate(
    req.params.id,
    { question, answer, tags },
    { new: true }
  );
  res.json(faq);
});

// Protected: DELETE
router.delete('/:id', auth, async (req, res) => {
  await FAQ.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;