const abidata = require("./abi.json");
const Web3 = require("web3");
const mainAddress = "0x8D809917A2e1F6aDE5E922BEc7A8Fb4cD3EFc3ca";
const privatekey =
  "d8c261b120663be4df37f355f6b6ae4a942f6dad39e24894ce12db599bce04a5";

let networkid = "11155111";

require("dotenv").config();

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/7e82f884b25b4aee822aaab722674066`
  )
);

const contract = new web3.eth.Contract(
  abidata.abi,
  "0xF11501934B843843433A4735A0DD8B7805123730"
);

async function withdraw() {
  const tx = await contract.methods.withdraw(10000000000);
  const gas = 100000;
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  // const totaltx = await web3.eth.getTransactionCount(mainAddress)
  // const nonce = '0x' + (totaltx + 1).toString(16)
  console.log("Pending...");
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      from: mainAddress,
      to: "0xF11501934B843843433A4735A0DD8B7805123730",
      data,
      gas,
      gasPrice,
      chainId: networkid,
    },
    privatekey
  );
  const receipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction,
    { chain: "sepolia" }
  );
  console.log("confirmation in core", receipt);
}

async function getBal() {
  const tx = await contract.methods.getBal(10000000000);
  const gas = 100000;
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  // const totaltx = await web3.eth.getTransactionCount(mainAddress)
  // const nonce = '0x' + (totaltx + 1).toString(16)
  console.log("Pending...");
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      from: mainAddress,
      to: "0xF11501934B843843433A4735A0DD8B7805123730",
      data,
      gas,
      gasPrice,
      chainId: networkid,
    },
    privatekey
  );
  const receipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction,
    { chain: "sepolia" }
  );
  console.log("confirmation in core", receipt);
}

module.exports = {
  withdraw: withdraw,
};

// withdraw();
