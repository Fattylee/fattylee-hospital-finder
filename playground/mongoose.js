/* eslint-disable */
import mongoose from "mongoose";
const { Schema, model, connect } = mongoose;

connect("mongodb://localhost/mDeveloperGuide", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then((res) => {
    console.log("************Hurray connected***********");
  })
  .catch((err) => {
    console.error("Nasty error", err.message);
  });

const userSchema = Schema({
  name: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

const postSchema = Schema({
  title: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

const commentSchema = Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const User = model("user", userSchema);
const Post = model("post", postSchema);
const Comment = model("comment", commentSchema);

// const newPost = await Post.create([
//   { title: "Js mastery" },
//   { title: "Mongoose blackbelt" },
//   { title: "Css ninja" },
// ]);
// const user = await User.findOne();
// const cm1 = await Comment.create({
//   content: "super great tutorial",
//   user: user.id,
// });
// const post2 = await Post.create({
//   title: "Graphql is so sweet",
//   comments: [cm1],
// });
// await User.create([{ name: "sul", posts: newPost }, { name: "farm" }]);

const fifthUser = await User.findOne()
  .skip(4)
  .populate({
    path: "posts",
    select: "comments -_id",
    populate: {
      path: "comments",
      select: "user",
      populate: {
        path: "user",
      },
    },
  });

// console.log(JSON.stringify(fifthUser, null, 1));

const posts = await Post.findOne({ title: /so/ }).populate({
  path: "comments",
  // model: "comment",
  // select: "user -_id",
  populate: {
    path: "user",
    // select: "name",
  },
});

// fifthUser.posts.push(posts);
// const up = await fifthUser.save();
// console.log(up);
// console.log(JSON.stringify(posts, null, 1));
// fifthUser.posts.push(newPost);

(async () => {
  const users = await User.find();
  // console.log(users);
})();
