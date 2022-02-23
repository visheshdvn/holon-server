const {
  getWeb3andContractInstances,
} = require("../utils/getWeb3andContractInstances");

const fs = require("fs");

const getAllSmartContractData = async (req, res) => {
  try {
    const { web3, LedNFT_CONTRACT, ICT_CONTRACT } =
      await getWeb3andContractInstances();
    let accounts = await web3.eth.getAccounts();

    let tokenIdToData = {};

    let circulatedTokens = await LedNFT_CONTRACT.methods.allMintedId().call();
    console.log("circulatedTokens", circulatedTokens);
    let totalSupply = circulatedTokens.length;

    for (let i = 0; i < totalSupply; i++) {
      let blinkingPattern = await LedNFT_CONTRACT.methods
        .getBlinkPatternOfTokenID(circulatedTokens[i])
        .call();

      const hash = await LedNFT_CONTRACT.methods
        .tokenHash(circulatedTokens[i])
        .call();

      tokenIdToData[circulatedTokens[i]] = {
        pulse: blinkingPattern,
        token_hash: hash,
      };
    }
    // console.log("tokenIdToData", tokenIdToData);

    let nodes = [];

    for (let i = 1; i <= 2048; i++) {
      if (circulatedTokens.includes(i + "")) {
        nodes.push(tokenIdToData[i + ""]);
      } else {
        nodes.push({
          pulse: [],
          token_hash: "",
        });
      }
    }

    return res.status(200).json([{ nodes }]);
  } catch (err) {
    console.log("error");
    console.log(err);
    return res.status(500).send({ status: "error" });
  }
};

module.exports = { getAllSmartContractData };
