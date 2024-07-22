const encode = require("hi-base32");
const { getRandomValues, subtle, randomUUID } = require("crypto");

const GenerateSecret = () => {
  // Generate a buffer of random values
  const array = new Uint32Array(10);
  getRandomValues(array);
  const buffer = Buffer.from(array);

  // Encode the buffer to base32
  const base32 = encode.encode(buffer).replace(/=/g, "").substring(0, 24);

  return base32;
};

module.exports = GenerateSecret;
