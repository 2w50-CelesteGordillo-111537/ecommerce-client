export async function checkout(orderData) {
  try {
    const url = `http://localhost:3001/checkout`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    };
    const result = await fetch(url, params);
    return result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
