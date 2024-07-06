const express = require('express');
const validate = require("../utils/ValidateRequest")
const {
    createPosts,
    deletePost,
    getAllPosts,
    getOnePost,
    updatePost
} = require('../controllers/postController');
const router = express.Router();


router.post('/', validate("post"), createPosts);
router.get('/', getAllPosts);
router.get('/:id', getOnePost);
router.put('/:id', validate("post"), updatePost);
router.delete('/:id', deletePost);

module.exports = router