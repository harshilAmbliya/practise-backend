const express = require('express');
const validate = require("../utils/ValidateRequest")
const {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser
} = require('../controllers/userController');
const router = express.Router();


router.post('/', validate("user"), createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id',validate("user"), updateUser);
router.delete('/:id', deleteUser);

module.exports = router