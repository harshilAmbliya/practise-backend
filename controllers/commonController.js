const mongoose = require("mongoose");
const { prepareResponse, errorResponse } = require("../utils/prepareResponse");
const express = require("express");
const fs = require("fs")





const uploadImage = (req, res) => {
    const formData = req.files;
    if (formData?.length > 0) {
        return res.status(200).json(prepareResponse(null, "file upload successfully..", 200))
    }
}
const getUploadImages = (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) {
            res.status(500).json({ message: 'Error reading upload directory' });
            return;
        }

        const imageUrls = files.map(file => `${process.env.IMAGE_URL}/${file}`); // Create image URLs
        return res.status(200).json(prepareResponse(imageUrls , "imageUrl Get Successfully.",200)); // Send list of image URLs
    });
}

module.exports = {
    uploadImage,
    getUploadImages
};
