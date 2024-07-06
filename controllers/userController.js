const User = require('../models/userModel'); // Assuming your model path
const { prepareResponse, errorResponse } = require('../utils/prepareResponse');

// Function to create a new user
const createUser = async (req, res) => {
  // , validate("user")
  try {
    const data = req.body;
    const { name, email, password } = data
    const users = await User.find();

    const userExist = users?.find((user) => user?.email === email)
    if (userExist) {
      return res.status(400).json(errorResponse("User Already Exist",500));
    }
    const user = await User.create({ name, email, password })
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(errorResponse(error.message,500));
  }
};

// Function to get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate({
      path: "posts",
    })
      ;
    res.status(200).json(prepareResponse(users,"All Users Fetch SuccessFully",200));
  } catch (error) {
    res.status(500).json(errorResponse(error.message,500));
  }
};

// Function to get a user by ID
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json(errorResponse("User Not Found",500));
    }
    res.status(200).json(prepareResponse(user,"User Fetch SuccessFully",200));
  } catch (error) {
    res.status(500).json(errorResponse(error.message,500));
  }
};

// Function to update a user by ID
const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json(errorResponse("User Not Found",404));
    }
    res.status(200).json(prepareResponse(updateUser,"User Updated SuccessFully",200));
  } catch (error) {
    res.status(500).json(errorResponse(error.message,500));
  }
};

// Function to delete a user by ID
const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json(errorResponse("User Not Found ",404));
    }

    const deleteUser = await User.findByIdAndDelete(id, { new: true })

    res.status(200).json(prepareResponse(deleteUser," User Deleted Fetch SuccessFully",200));
  } catch (error) {
    res.status(500).json(errorResponse(error.message,500));
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
