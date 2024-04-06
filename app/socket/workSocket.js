const fs = require("node:fs");

const blogPost = require("../models/blogPostModel");
const comment = require("../models/commentModel");

const workSocket = (io, socket) => {
  socket.on("hello", function (data) {
    console.log("hello world 8=)", data);
  });

  socket.on("postDeconste", async function (id) {
    const post = await blogPost.find({ _id: id });

    if (post[0].image) {
      fs.unlinkSync("./public/images/" + post[0].image);
    }
    const deconstedPost = await blogPost.findByIdAndDeconste({
      _id: post[0]._id,
    });

    socket.emit("deconstedPost", deconstedPost);
  });

  socket.on("postEdit", async function (id) {
    const post = await blogPost.find({ _id: id });

    socket.emit("editPost", post[0]);
  });

  socket.on("postLike", async (data) => {
    const post = await blogPost.find({ _id: data.postId });

    if (post[0].like.includes(data.authId)) {
      const likeArr = [...post[0].like];

      likeArr.splice(likeArr.indexOf(data.authId), 1);

      const postLikeUpdate = await blogPost.findByIdAndUpdate(
        { _id: data.postId },
        { like: likeArr },
        { new: true }
      );
      socket.emit("postLikeToogle", postLikeUpdate);
    } else {
      const postLikeUpdate = await blogPost.findByIdAndUpdate(
        { _id: data.postId },
        { $push: { like: data.authId } },
        { new: true }
      );
      socket.emit("postLikeToogle", postLikeUpdate);
    }
  });

  socket.on("addComment", async (data) => {
    // console.log(data);
    const addComment = new comment({
      description: data.comment,
      authId: data.authId,
      postId: data.postId,
    });

    addComment.save();

    const updateCommentSection = await blogPost.findOneAndUpdate(
      { _id: data.postId },
      { $push: { commentId: addComment._id } }
    );

    const getComment = await comment
      .find({ postId: data.postId })
      .populate({ path: "authId", select: "_id uname image" });
    console.log(getComment);
    socket.emit("getComment", getComment);
  });
};

module.exports = workSocket;
