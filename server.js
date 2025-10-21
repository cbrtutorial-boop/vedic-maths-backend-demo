const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for your Netlify frontend
app.use(cors({
  origin: 'https://silly-jalebi-9625d1.netlify.app' // Replace with your Netlify URL
}));

app.use(express.json());
app.use(express.static('public')); // Note: This won't work on Render without public/ folder

// Mock order creation endpoint
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    if (!Number.isInteger(amount) || amount !== 99900) { // Enforce ₹999 in paise
      return res.status(400).json({ error: 'Invalid amount' });
    }
    const order = {
      orderId: `order_${Date.now()}`,
      amount,
      currency,
      receipt
    };
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mock payment verification endpoint
app.post('/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    res.json({ success: true, payment_id: razorpay_payment_id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));