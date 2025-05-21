export function formatCurrency(numberString) {
  const number = Number(numberString);
  return number.toLocaleString("id-ID");
}
