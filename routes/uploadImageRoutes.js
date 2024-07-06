const express = require('express');
const validate = require("../utils/ValidateRequest")
const {
    uploadImage,
    getUploadImages
} = require('../controllers/commonController');
const router = express.Router();
const path = require("path")

const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `upload_${file.originalname}`)
    }
});


const upload = multer({
    storage: storage,
})

router.post('/', upload.array('file'), uploadImage);
router.use('/', express.static("uploads"),getUploadImages);

module.exports = router