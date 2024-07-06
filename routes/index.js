const express = require('express')
const router = express.Router();
const userRoutes = require("../routes/userRoutes")
const postRoutes = require("../routes/postRoutes")
const uploadImageRoutes = require("../routes/uploadImageRoutes")


router.get('/ping', (req, res) => { res.status(200).json({ message: "server successfully running", success: true }) })
router.use('/users', userRoutes)
router.use('/posts', postRoutes)
router.use('/upload-image', uploadImageRoutes)


module.exports = router