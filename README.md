# Bothu Jobs Backend

A production-ready Node.js/Express backend for handling Paystack subscriptions and credit synchronization.

## Setup Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Variables:
   Create a `.env` file (if not created already) and configure your Paystack secret key:
   ```
   PORT=5000
   PAYSTACK_SECRET_KEY=your_paystack_secret_key_here
   ```

3. Run the server:
   ```bash
   npm start
   ```

## Deploying to Render

### Prerequisites
- A GitHub repository containing this codebase.
- A Render account (https://render.com/).

### Deployment Steps
1. Log in to your Render dashboard and click **New > Web Service**.
2. Connect your GitHub repository containing the Bothu Jobs backend.
3. Configure the Web Service settings as follows:
   - **Name**: `bothu-jobs-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Expand the **Advanced** section or go to **Environment** tab and add the Environment Variables:
   - `PORT`: (Render generally populates this automatically, but you can leave it out or add `5000`)
   - `PAYSTACK_SECRET_KEY`: (Add your actual Production/Test Secret Key here)
5. Click **Create Web Service**. Render will automatically build and deploy your application.

### Webhook Configuration in Paystack
Once your backend is successfully deployed, Render gives you a live URL, for instance `https://bothu-jobs-backend.onrender.com`.

1. Go to your **Paystack Dashboard** > Settings > API Keys & Webhooks.
2. Under **Webhook URL**, set it to your new endpoint format:
   ```text
   https://{YOUR_RENDER_APP_URL}/paystack-webhook
   ```
   *Example: `https://bothu-jobs-backend.onrender.com/paystack-webhook`*
3. Save changes. Paystack will now securely send transaction events to your remote backend.
