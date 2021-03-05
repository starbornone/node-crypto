const crypto = require('crypto');

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');

  // sort ensures this produces the same hash using the same input arguments in any order
  hash.update(inputs.map(input => JSON.stringify(input)).sort().join(' '));

  return hash.digest('hex');
};

module.exports = cryptoHash;