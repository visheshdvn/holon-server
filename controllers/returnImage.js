const {
  getWeb3andContractInstances,
} = require("../utils/getWeb3andContractInstances");

const returnImage = async (req, res) => {
  const { web3, LedNFT_CONTRACT, ICT_CONTRACT } =
    await getWeb3andContractInstances();
  const { tokenId } = req.params;

  const hash = await LedNFT_CONTRACT.methods.tokenHash(+tokenId).call();

  if (
    hash ===
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    // token id does't exist (not minted yet)
    console.log("Not minted yet");
  }

  console.log("hash: ", hash);

  return res.status(200).send({ status: "success" });
};

module.exports = { returnImage };
