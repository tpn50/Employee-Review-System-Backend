const User = require("../models/user");
const Review = require("../models/review");

exports.getUsersToReview = async (req, res) => {
  try {
    // get the logged-in user from the request object
    const loggedInUser = req.user;

    // find the user with the given id in the database
    const user = await User.findById(loggedInUser.id).populate("userToReview");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // return success response with the users to review
    res.status(200).json({
      success: true,
      usersToReview: user.userToReview,
      message: "Users to review fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching users to review",
    });
  }
};

exports.giveReview = async (req, res) => {
  try {
    const reviewer = req.user.id; // the id of the logged-in user
    const { content } = req.body; // the content of the review
    const reviewedId = req.params.user_id; // the id of the user to review from the route parameters

    // Check if the user to review exists
    const userToReview = await User.findById(reviewedId);
    if (!userToReview) {
      return res.status(400).json({
        success: false,
        message: "User to review does not exist",
      });
    }

    // Create a new review
    const review = new Review({
      content,
      reviewer,
      reviewed: reviewedId,
    });

    // Save the review
    await review.save();

    // Add the review to the reviewed user's reviews
    userToReview.reviewRecivedFrom.push(review._id);
    await userToReview.save();

    res.status(200).json({
      success: true,
      review,
      message: "Review added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding review",
    });
  }
};
