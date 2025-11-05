export const handler = async (event) => {
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
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};