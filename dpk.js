const crypto = require("crypto");


exports.deterministicPartitionKey = (event) => {
  
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  
  let candidate = getPartitionKey(event);

  if(candidate === null) {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  else if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getHash(candidate);
  }

  return candidate;
};

function getPartitionKey(event) {
  //when event is null or undefined
  if (event) {

    //when event has a partitionKey
    if(event.partitionKey) {
      return event.partitionKey;
    }
    //when event doesn't have a partitionKey
    else{
      //Convert event to string
      const data = JSON.stringify(event);

      //Return hash of event
      return getHash(data);
    }
  }

  //when event is null or undefined
  return null;
}

function getHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}