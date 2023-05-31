const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { getUsersToReview, giveReview } = require("../controllers/employee");

router.get("/userstoreview", auth, getUsersToReview);
router.post("/:user_id/review", auth, giveReview);

module.exports = router;
