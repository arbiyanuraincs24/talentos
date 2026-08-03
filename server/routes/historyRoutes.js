const express = require("express");

const router = express.Router();


const {
    getHistory
} = require("../controllers/historyController");



// GET Interview History

router.get(
    "/:userId",
    getHistory
);



module.exports = router;