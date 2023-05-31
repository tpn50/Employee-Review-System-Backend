const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(400).json({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching data",
    });
  }
};

exports.addUserToReview = async (req, res) => {
  try {
    // get user id from the parameters and the user id to be reviewed from the request body
    const { user_id } = req.params;
    const { userToReviewId } = req.body;

    // find the user with the given id
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // find the user to review
    const userToReview = await User.findById(userToReviewId);
    if (!userToReview) {
      return res.status(400).json({
        success: false,
        message: "User to review not found",
      });
    }

    // add the user to review to the user's userToReview array
    user.userToReview.push(userToReviewId);

    // save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      user,
      message: "User added to review successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding user to review",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // get user id from the parameters
    const { userid } = req.params;

    // find the user with the given id and delete it
    const user = await User.findByIdAndDelete(userid);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // return success response
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
    });
  }
};
