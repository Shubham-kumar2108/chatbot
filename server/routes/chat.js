const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');

router.post('/', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ message: 'No question provided' });

  const faqs = await FAQ.find();
  let bestMatch = null;
  let bestScore = 0;

  faqs.forEach(faq => {
    const qWords = question.toLowerCase().split(/\s+/);
    const faqWords = faq.question.toLowerCase().split(/\s+/);
    const score = qWords.filter(word => faqWords.includes(word)).length;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  });

  if (bestMatch) {
    const suggestions = faqs
      .filter(f => f._id.toString() !== bestMatch._id.toString())
      .slice(0, 3);

    res.json({
      answer: bestMatch.answer,
      matchedQuestion: bestMatch.question,
      suggestions
    });
  } else {
    res.json({ answer: "Sorry, I don't know that yet. Try rephrasing or ask another question." });
  }
});

module.exports = router;