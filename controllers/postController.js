const mongoose = require("mongoose");
const Post = require("../models/postModule");
const User = require("../models/userModel");
const { prepareResponse, errorResponse } = require("../utils/prepareResponse");

const createPosts = async (req, res) => {
    try {
        const { title, description, createdBy } = req.body;
        const post = await Post.create({ title, description, createdBy });
        const user = await User.findOneAndUpdate({ _id: createdBy }, { $push: { posts: post } }, { new: true })
        console.log(user)
        res.status(201).json(prepareResponse(post, "post created successfully", 200));
    } catch (error) {
        res.status(500).json(errorResponse(error.message, 500));
    }
}

const getAllPosts = async (req, res) => {
    try {

        const post = await Post.find().select(" _id createdBy title description createdAt ").populate({ path: 'createdBy', select: '-posts' })
        res.status(200).json(prepareResponse({ post, totalPosts: post?.length }, "All post fetch successfully", 200));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOnePost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id).populate({ path: "createdBy", select: "-posts" });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(prepareResponse(post, "get one successfully", 200));
    } catch (error) {
        res.status(500).json(errorResponse(error.message, 500));
    }

}

const updatePost = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!updatedPost) {
            return res.status(401).json(res.status(500).json(errorResponse("Post not found", 401)));
        }
        res.status(200).json(prepareResponse(updatedPost, "post updated successfully", 200));
    } catch (e) {
        res.status(500).json(errorResponse(e.message, 500));
    }
}

const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(prepareResponse(deletePost, "post deleted successfully", 200));
    } catch (error) {
        res.status(500).json(errorResponse(error.message, 500));
    }
}

module.exports = {
    createPosts,
    getAllPosts,
    getOnePost,
    updatePost,
    deletePost,
};
