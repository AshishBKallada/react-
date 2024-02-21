const { generateToken } = require("../functions/jwt");
const { Admin } = require("../models/adminmodels");
const { User } = require("../models/usermodels");

const adminLogin = async (req, res, next) => {
    console.log("ADMIN LOGIN API CALLED");

    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (admin.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const payload = {
            _id: admin._id,
            name: admin.name,
            email: admin.email
        };
        console.log(admin);
        const token = generateToken(payload)
        console.log('TOKEN-------', token);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Admin is Valid',payload:payload, token: token });

    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getUsers = async (req, res, next) => {

    console.log('getUsers API CALLED');
    try {
        const userData = await User.find({});
        if (userData) {
            res.status(200).json({ message: 'User data fetched', users: userData });
        } else {
            res.status(404).json({ message: 'No user data found' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const removeUser = async (req, res, next) => {
    try {
        console.log('REMOVE USER API CALLED');
        const userId = req.params.id;
        console.log(userId);
        const removeUser = await User.findByIdAndDelete({ _id: userId });
        if (removeUser) {
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found or already deleted' });
        }
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const updateUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const id = req.params.id;

        const existingUser = await User.findById(id);

        const updatedUserData = {
            email: email || existingUser.email,
            password: password || existingUser.password
        };

        const updateUser = await User.findByIdAndUpdate(id, updatedUserData, { new: true });

        if (updateUser) {
            res.status(200).json({ message: 'User updated', user: updateUser });
        } else {
            res.status(404).json({ message: 'User not found or failed to update' });
        }
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addUser = async (req, res) => {
    console.log("USER ADDED");
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const newUser = await User.create({ name, email, password });
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        console.error('Error adding user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};





module.exports = { adminLogin, getUsers, removeUser, updateUser, addUser }