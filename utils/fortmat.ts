export const formatAmount = (value: number) =>
  value.toFixed(8).replace(/\.?0+$/, "");

export const validInput = (value: string) => {
  const regex = /^[0-9]-?\d*\.?\d{0,8}$/;
  return ((regex.test(value) || value === "") && value.length < 12)
}
