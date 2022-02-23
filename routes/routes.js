const router = require("express").Router();

const { returnImage } = require("../controllers/returnImage");
const { getAllSmartContractData } = require("../controllers/scData");

// data routers
router.get("/allNFTdata", getAllSmartContractData);

// media
router.get("/image/:tokenId", returnImage);

module.exports = router;