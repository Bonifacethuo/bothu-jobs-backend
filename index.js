require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// Mock function for updating user credits
const updateUserCredits = (email, plan) => {
  console.log(`[Mock] Successful credit grant to user: ${email} for plan: ${plan}`);
};

// Webhook endpoint to listen for Paystack events
app.post('/paystack-webhook', (req, res) => {
  const payload = req.body;

  // IMPORTANT: For production, you should verify the Paystack webhook signature
  // using crypto and process.env.PAYSTACK_SECRET_KEY to ensure the request is from Paystack.

  if (payload && payload.event === 'charge.success') {
    const data = payload.data;
    
    // Safely extract customer email and plan_code
    const email = data?.customer?.email || 'unknown_email@example.com';
    const planCode = data?.plan?.plan_code || data?.plan || data?.plan_object?.plan_code || 'unknown_plan';

    console.log(`Received charge.success event for ${email} with plan ${planCode}`);

    // Map the plan to credit updates
    updateUserCredits(email, planCode);
  } else {
    console.log(`Received non-charge.success event or empty payload`);
  }

  // Acknowledge receipt with 200 OK so Paystack doesn't retry
  res.status(200).send('Webhook received successfully');
});

// Root route (prevents "Cannot GET /" error)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bothu Jobs Backend is running successfully 🚀",
    status: "OK",
  });
});

// Health check route (useful for Render uptime monitoring)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.listen(PORT, () => {
  console.log(`Bothu Jobs Backend is running on port ${PORT}`);
});
