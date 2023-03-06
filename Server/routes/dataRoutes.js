const {sendMsg,showMsg} = require("../controller/dataController");
const router = require("express").Router();
router.post("/sendata/",sendMsg);
router.post("/showdata/",showMsg);



module.exports = router;