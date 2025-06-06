export function generateFakeISBNCode() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
  const totalLength = Math.floor(Math.random() * 9) + 8;
  let id = "";

  const array = new Uint8Array(totalLength);
  crypto.getRandomValues(array);

  for (let i = 0; i < totalLength; i++) {
    id += chars[array[i] % chars.length].toUpperCase();
  }

  return id;
}
