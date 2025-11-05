import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { order_id } = JSON.parse(event.body);

    const response = await fetch(`https://sandbox.cashfree.com/pg/orders/${order_id}`, {
      method: "GET",
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.order_status === "PAID") {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "Payment verified", data }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Payment not yet completed", data }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
}
