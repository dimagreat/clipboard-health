const crypto = require("crypto");

const DETERMISTIC_PARAMS = {
  TRIVIAL_PARTITION_KEY: "0",
  MAX_PARTITION_KEY_LENGTH: 256,
};

const cryptContent = function (content) {
  return crypto.createHash("sha3-512").update(content).digest("hex");
};

exports.deterministicPartitionKey = function (event) {
  if (!event) {
    return DETERMISTIC_PARAMS.TRIVIAL_PARTITION_KEY;
  }

  const result = event.partitionKey
    ? JSON.stringify(event.partitionKey)
    : cryptContent(JSON.stringify(event));

  if (result.length > DETERMISTIC_PARAMS.MAX_PARTITION_KEY_LENGTH) {
    return cryptContent(result);
  }

  return result;
};

exports.cryptContent = cryptContent;
exports.DETERMISTIC_PARAMS = DETERMISTIC_PARAMS;
