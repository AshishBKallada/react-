const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const dbUrl = 'mongodb://127.0.0.1:27017/reactdb';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default: true
    },
    dp:{
        type:String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {User};
