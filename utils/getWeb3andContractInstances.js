var Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");
const axios = require("axios");

var address = process.env.address;
var privatekey = process.env.privateKey;
var rpcurl = process.env.infuraRPCURL;

async function getWeb3andContractInstances() {
  let LedNFT_ABI, ICT_ABI;

  let ledNftFileResponse = await axios.get(
    "https://raw.githubusercontent.com/visheshdvn/hosted-assets/main/webflow_goreli_ABIs/LedNFT.json"
  );

  LedNFT_ABI = await JSON.parse(JSON.stringify(ledNftFileResponse.data));

  let ICTFileResponse = await axios.get(
    "https://raw.githubusercontent.com/visheshdvn/hosted-assets/main/webflow_goreli_ABIs/IntensityChangeToken.json"
  );
  ICT_ABI = await JSON.parse(JSON.stringify(ICTFileResponse.data));

  const LedNFT_CONTRACT_ADDRESS = LedNFT_ABI.networks[5].address;
  const ICT_CONTRACT_ADDRESS = ICT_ABI.networks[5].address;

  const provider = new Provider(privatekey, rpcurl);
  const web3 = new Web3(provider);

  const LedNFT_CONTRACT = new web3.eth.Contract(
    LedNFT_ABI.abi,
    LedNFT_CONTRACT_ADDRESS
  );
  const ICT_CONTRACT = new web3.eth.Contract(ICT_ABI.abi, ICT_CONTRACT_ADDRESS);

  return { web3, LedNFT_CONTRACT, ICT_CONTRACT };
}

module.exports = { getWeb3andContractInstances };