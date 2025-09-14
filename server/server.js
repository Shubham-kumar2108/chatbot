const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error", err));

// Routes
app.get('/', (req, res) => {
res.send('API is running ');
});
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});