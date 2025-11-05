import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { orderId } = JSON.parse(event.body);

    const response = await fetch(`https://sandbox.cashfree.com/pg/orders/${orderId}`, {
      method: "GET",
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { statusCode: 400, body: JSON.stringify({ success: false, data }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: data.order_status === "PAID",
        message: data.order_status === "PAID" ? "Paid" : "Not paid",
        data
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
}