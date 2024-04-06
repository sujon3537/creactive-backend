const blogPost = require("../../models/blogPostModel");

const blog = {
  async getAllPost(req, res) {
    const allPost = await blogPost.find({}).populate({
      path: "authId",
      select: "_id uname image",
    });
    res.send({
      success: "success",
      data: allPost,
    });
  },

  async singlePost(req, res) {
    const { postId } = req.params;

    const singlePost = await blogPost
      .find({ _id: postId })
      .populate({
        path: "authId",
        select: "_id uname image",
      })
      .populate({
        path: "commentId",
        select: "_id description authId",
        populate: {
          path: "authId",
          select: "_id uname image",
        },
      });

    res.send({
      success: "success",
      data: singlePost[0],
    });
  },
};

module.exports = blog;
