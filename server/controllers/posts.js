import Mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const getSinglePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post found with this id");
    const postMessages = await PostMessage.findById(_id);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!Mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post found with this id");
  const post = req.body;
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post found with this id");
    await PostMessage.findByIdAndDelete(_id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const likePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post found with this id");
    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      {
        likeCount: post.likeCount + 1,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json(error);
  }
};
