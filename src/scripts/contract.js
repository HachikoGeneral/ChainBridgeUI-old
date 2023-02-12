const ethers = require('ethers');

const executeDeposit = async (provider, amount, network, pubKey) => {
  const { contract, txCount } = await instantiateContract(provider, pubKey, network);
  await executeTransaction(contract, amount, txCount, pubKey, provider, network);
  return contract;
};

const instantiateContract = async (provider, pubKey, network) => {
  const txCount = await provider.getTransactionCount(pubKey[0]);
  const abi = [{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_toChain","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"}],"name":"ContractCreation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_recipient","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_toChain","type":"uint256"}],"name":"Deposit","type":"event"}];
  const signer = provider.getSigner();
  let contractAddress;
  if (network === 'chikochain') {
    contractAddress= '0x4b552F62A4Db1f31C59c93E8Cb5A112a410598Ef';
  } else if (network === 'polygon') {
    contractAddress = '0x006f485B4216759cfb8979DE2E4974f74c95585D';
  }
  let contract = new ethers.Contract(contractAddress, abi, signer);
  return { contract, txCount, signer };
};

const executeTransaction = async (contract, amount, txCount, pubKey, provider, network) => {
  const wei = ethers.utils.parseEther(amount);
  const overrideOptions = {
    gasLimit: 250000,
    gasPrice: 9000000000,
    nonce: txCount,
    value: wei,
  };
  let tx = await contract.functions.deposit(pubKey[0], 6284, overrideOptions);
};

export default executeDeposit;


