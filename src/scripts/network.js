const Web3 = require('web3');
let web3 = new Web3();

const getNetwork = async () => {
  web3 = new Web3(Web3.givenProvider || "ws://70.34.216.42:9933");
  const network = await web3.eth.net.getNetworkType();
  return network;
}

export default getNetwork;

