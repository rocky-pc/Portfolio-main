export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);

    // 1️⃣ Get order_id from webhook or frontend redirect
    const { order_id } = body;

    // 2️⃣ Call Cashfree Order Status API
    const res = await fetch(`https://sandbox.cashfree.com/pg/orders/${order_id}`, {
      method: "GET",
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01",
      },
    });

    const data = await res.json();

    // 3️⃣ Check order status
    if (data.order_status === "PAID") {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Payment verified successfully!",
          data,
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Payment not completed yet",
          data,
        }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
}
