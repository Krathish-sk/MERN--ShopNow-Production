function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export function calcPrices(orderItems) {
  // Calculate the item price
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //   Calculate shipping price
  const shippingPrice = addDecimals(itemsPrice > 500 ? 0 : 100);
  // Calculate tax price
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  //   Calculate the total price
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
}
