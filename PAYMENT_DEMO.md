# SSLCommerz ticket checkout demo

This implementation follows `CSE2200/payment-gateway-demo`: generate a unique MongoDB ObjectId transaction ID, create a pending order, initialize SSLCommerz, redirect to `GatewayPageURL`, and receive success/failure/cancellation callbacks. It uses the reference's `sslcommerz-lts` package and `new SSLCommerzPayment(storeId, storePassword, false).init(data)` for checkout. Verification uses the documented GET API because version 1.2.0 of the SDK hardcodes POST even for its validation method. Node 20+ is required. Unlike the reference, a success notification alone never confirms a purchase: the backend validates the transaction with SSLCommerz first.

## Configure and run

1. Register for sandbox merchant credentials at https://developer.sslcommerz.com/registration/ .
2. The payment settings are in `nearby-backend/.env` directly. Fill in `SSL_STORE_ID`, `SSL_STORE_PASSWORD`, if blank; `SSL_IS_LIVE=false` selects sandbox and `ALLOWED_ORIGIN` is the frontend origin. Keep existing MongoDB, JWT and Cloudinary settings. Never put the store password in frontend code or commit `.env`.
3. Start the backend on port 5000 with `API_BASE_URL=http://localhost:5000/api`. No ngrok is needed for this local sandbox demo. Start a NEW checkout after changing this URL; existing gateway sessions retain their old callbacks.
4. Keep `ALLOWED_ORIGIN=http://localhost:5173` and start the frontend with `npm run dev`. Open it at that exact origin. The browser still calls localhost:5000; only gateway callbacks use the tunnel. This avoids changing the existing local authentication-cookie setup.
5. Sign in as a regular user, open an approved event, select up to 10 tickets across ticket types, enter a phone number and billing address, and choose **Pay with SSLCommerz**.
6. Complete a test payment using the sandbox gateway's test options. Do not use a real payment account. The returned receipt shows verified status and the unique transaction ID; confirmed purchases appear in **Profile → My Tickets**.

No real payment is collected. `SSL_IS_LIVE=true` is deliberately rejected. Free tickets are confirmed in MongoDB without creating a gateway session.

## Data and verification

- `POST /api/payments/checkout` requires the existing JWT cookie and regular-user role. Only ticket IDs/quantities are accepted as pricing inputs; the backend loads approved-event prices and calculates the amount itself.
- MongoDB `orders` stores an immutable event/ticket snapshot, purchaser, amount, transaction ID and payment status. No card data is stored.
- Public callbacks: `POST /api/payments/callback/:outcome/:transactionId`, where outcome is `success`, `failed`, or `cancelled`. Each callback URL includes a random per-order token. Callbacks do not depend on browser cookies.
- `POST /api/payments/ipn` receives asynchronous gateway notifications. Local checkout omits the IPN URL because remote servers cannot reach localhost. Both success and IPN call the SSLCommerz validation API. Transaction ID, amount, BDT currency, VALID/VALIDATED status and risk level 0 must match before confirmation.
- Confirmation is an atomic update. Duplicate notifications do not create extra tickets; failure/cancellation cannot overwrite a confirmed purchase. A later verified IPN can confirm a previously cancelled/failed order.
- `GET /api/payments/orders` returns the signed-in user's latest 100 confirmed orders. `GET /api/payments/orders/:transactionId` only returns that user's order. A frontend success URL cannot fabricate a receipt.
- The result page polls pending status for approximately 30 seconds, then offers manual refresh. Each owner status request also queries SSLCommerz by transaction ID and validates a successful result. If browser return fails, open http://localhost:5173/purchase-success in the same tab to recover the last checkout from sessionStorage. Internet, frontend, and backend must remain available. Browser restrictions may block gateway-to-localhost return; the status page is the fallback. Verification failures never confirm a purchase.
- Previous localStorage demo purchases are intentionally not treated as paid orders. Organizer sales counts are outside this change.

## Checks

Run `node --test test/payment.test.cjs` from nearby-backend and `npm run build` from nearby.

Manual sandbox checks after configuration: successful payment, cancellation, failed test payment, free ticket, mixed ticket types, more than 10 tickets rejected, and repeated callbacks producing only one order confirmation. Merchant credentials are required to run the actual hosted-gateway demo; mocked tests do not replace that check.

Reference: https://github.com/AtiqurRahmanAni/CSE2200/tree/main/payment-gateway-demo
API documentation: https://developer.sslcommerz.com/doc/v4/
