const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUserToReview,
  deleteUser,
} = require("../controllers/admin");
const { auth, isAdmin } = require("../middleware/auth");

router.get("/allusers", auth, isAdmin, getUsers);
router.post("/:user_id/addusertoreview", auth, isAdmin, addUserToReview);
router.delete("/:userid", auth, isAdmin, deleteUser);

module.exports = router;
