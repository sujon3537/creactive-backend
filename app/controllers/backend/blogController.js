const fs = require("node:fs");

const blogPost = require("../../models/blogPostModel");

const blog = {
  createBlogPost(req, res) {
    const { title, description, authId } = req.body;

    const post = new blogPost({
      title,
      description,
      image: req.file.filename,
      authId,
    });

    post.save();

    res.send({
      success: "Post Created Successfully!",
    });
  },

  async updateBlogPost(req, res) {
    const { updatedTitle, updatedDescription, postId, prev_image_name } =
      req.body;
    if (req.file) {
      fs.unlinkSync("./public/images/" + prev_image_name);
    }

    const updatedPost = await blogPost.findOneAndUpdate(
      { _id: postId },
      {
        title: updatedTitle,
        description: updatedDescription,
        image: req.file.filename,
      },
      {
        new: true,
      }
    );

    res.send({
      success: "Post Updated Successfully!",
      data: updatedPost,
    });
  },

  async getAllPost(req, res) {
    const allPosts = await blogPost.find({});

    res.send({
      data: allPosts,
    });
  },

  async singlePost(req, res) {
    const { postId } = req.params;

    const singlePost = await blogPost.find({ _id: postId });

    res.send({
      success: "success",
      data: singlePost[0],
    });
  },
};

module.exports = blog;
