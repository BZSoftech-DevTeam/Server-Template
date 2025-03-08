const USD = require("../models/user-data"); // Adjust path as needed

const createUser = async (req, res) => {
  try {
    const existingUser = await USD.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = new USD(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const existingUser = await USD.findOne({ username });
//     if (!existingUser) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     if (existingUser.password !== password) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     res.status(200).json({ message: "Login successful", user: existingUser });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const checkPassword = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await USD.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await USD.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await USD.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username } = req.query;
    const updateData = req.body;

    const updatedUser = await USD.findOneAndUpdate({ username }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User with this ID does not exist" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating agent:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { username } = req.query;
    const deletedUserData = await USD.findOneAndDelete({ username });
    if (!deletedUserData) {
      return res.status(404).json({ error: "User Data not found" });
    }
    res.status(200).json({ message: "User Data deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete User Data",
      details: error.message,
    });
    console.error("Failed to fetch agents:", error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  checkPassword,
};
