const { deterministicPartitionKey } = require('./dpk');
const crypto = require('crypto');

describe('deterministicPartitionKey', () => {
  test('should return "0" if event is not provided', () => {
    const result = deterministicPartitionKey();
    expect(result).toBe("0");
  });

  test('should return the event.partitionKey if it exists', () => {
    const event = {
      partitionKey: "example"
    };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(event.partitionKey);
  });

  test('should return the hashed value of the event as the partition key if event.partitionKey is not present', () => {
    const event = {
      data: "example"
    };
    const dataHash = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex');
    const result = deterministicPartitionKey(event);
    expect(result).toBe(dataHash);
  });

  test('should return the hashed value of the candidate if it exceeds the maximum length', () => {
    const event = {
      data: "example",
      partitionKey: "a".repeat(300)
    };
    const candidateHash = crypto.createHash('sha3-512').update(event.partitionKey).digest('hex');
    const result = deterministicPartitionKey(event);
    expect(result).toBe(candidateHash);
  });
});