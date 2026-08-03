const express = require("express");

const router = express.Router();


const {
    saveInterview
} = require("../controllers/interviewSaveController");



router.post(
    "/save",
    saveInterview
);



module.exports = router;