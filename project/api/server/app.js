const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();



app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/public', express.static('public'));

const userRoutes = require('../routes/userRoutes');
const adminRoutes = require('../routes/adminRoutes');
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
