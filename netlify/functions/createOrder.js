export const handler = async (event) => {
  const { orderId, amount, customerName, customerEmail, customerPhone } = JSON.parse(event.body);

  const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": process.env.CASHFREE_APP_ID,
      "x-client-secret": process.env.CASHFREE_SECRET_KEY,
      "x-api-version": "2022-09-01",
    },
    body: JSON.stringify({
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerPhone,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
    }),
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
