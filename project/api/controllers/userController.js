const { generateToken } = require('../functions/jwt');
const { User } = require('../models/usermodels');

const userSignup = async (req, res, next) => {
    console.log('Signup API called');
    console.log(req.body);
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const addUser = await User.insertMany([{ name, email, password }]);
        if (addUser) {
            console.log('USER ADDED');
            res.status(201).json({ message: 'User signed up successfully', user: addUser[0] });
        }
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("USER LOGIN API CALLED");
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email
          };
        console.log(user);
        const token = generateToken(payload)
        console.log('TOKEN-------',token);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'User is Valid', payload:payload,token: token });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const updateImage = async (req, res, next) => {
    console.log('UPDATE IMAGE API CALLED');
    
    try {
      const image = req.file;
      console.log(image);
      const updateImage = await User.findByIdAndUpdate(req.body.id,{$set:{dp:image.originalname}})

      console.log('Image updated successfully');
      res.status(200).json({ message: 'Image updated successfully' });
    } catch (error) {
      console.error('Error updating image:', error.message);
      res.status(500).json({ error: 'Failed to update image' });
    }
  };
  
  

module.exports = { userSignup, userLogin ,updateImage};
