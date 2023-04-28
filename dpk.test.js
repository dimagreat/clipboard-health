const { deterministicPartitionKey, DETERMISTIC_PARAMS, cryptContent } = require("./dpk");

describe("deterministicPartitionKey", () => {
  test("returns trivial partition key for falsy event", () => {
    const expectedPartitionKey = DETERMISTIC_PARAMS.TRIVIAL_PARTITION_KEY;
    expect(deterministicPartitionKey()).toEqual(expectedPartitionKey);
    expect(deterministicPartitionKey(null)).toEqual(expectedPartitionKey);
    expect(deterministicPartitionKey(false)).toEqual(expectedPartitionKey);
    expect(deterministicPartitionKey(0)).toEqual(expectedPartitionKey);
  });

  test("returns crypted deterministic partition key for empty object", () => {
    const event = {};
    const expectedPartitionKey = cryptContent(JSON.stringify(event));
    expect(deterministicPartitionKey(event)).toEqual(expectedPartitionKey);
  });

  test("returns crypted stringified object as deterministic partition key for falsy partition key", () => {
    const event = {
      partitionKey: 0,
    };

    const expectedPartitionKey = cryptContent(JSON.stringify(event));

    expect(deterministicPartitionKey(event)).toEqual(expectedPartitionKey);
  });

  test("returns crypted event object deterministic partition key for event object without partition key", () => {
    const event = {
      foo: "bar",
    };
    const expectedPartitionKey = cryptContent(JSON.stringify(event));
    expect(deterministicPartitionKey(event)).toEqual(expectedPartitionKey);
  });

  test("returns deterministic partition key for string as partition key", () => {
    const expectedStringifiedKey = "key";
    const event = {
      partitionKey: expectedStringifiedKey,
    };
    expect(deterministicPartitionKey(event)).toEqual(expectedStringifiedKey);
  });

  test("returns stringified deterministic partition key for numbered partition key", () => {
    const partitionKey = 125;
    const expectedStringifiedKey = `${partitionKey}`;
    const event = {
      partitionKey: partitionKey,
    };
    expect(deterministicPartitionKey(event)).toEqual(expectedStringifiedKey);
  });

  test("returns stringified object deterministic partition key for object as partition key", () => {
    const partitionKey = {
      foo: "bar",
      name: "John Doe",
    };
    const expectedStringifiedKey = JSON.stringify(partitionKey);
    const event = {
      partitionKey: partitionKey,
    };
    expect(deterministicPartitionKey(event)).toEqual(expectedStringifiedKey);
  });

  test("returns truncated deterministic partition key for long string partition key", () => {
    const longPartitionKey = "x".repeat(300);
    const event = {
      partitionKey: longPartitionKey,
    };

    console.log(longPartitionKey.length);

    const expectedPartitionKey = cryptContent(longPartitionKey);

    expect(deterministicPartitionKey(event)).toEqual(expectedPartitionKey);
  });

  // TODO: fix potential bug
  test("works bad with bigInt", () => {
    const stringLongKey = "123".repeat(300);
    const numberLongKey = +stringLongKey;
    const event = {
      partitionKey: numberLongKey,
    };

    const expectedWrongResult = "null";

    expect(deterministicPartitionKey(event)).toEqual(expectedWrongResult);
  });
});
