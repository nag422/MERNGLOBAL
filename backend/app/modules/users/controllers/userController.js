const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

/* @desc create a new user
@route POST /users
@access private */

const createNewUser = async(req, res) => {
    const { email, password } = req.body;
    // Confirm data
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required'});
    }

    // Check for duplicates
    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate email'})
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
    const userObject = { email, "password": hashedPwd }
    // Create and store new user
    const user = await User.create(userObject);
    if (user) {
        res.status(201).json({ message: `New user ${email} created`});
    } else {
        res.status(400).json({ message: 'Invalid user data received'});
    }
}

module.exports = {
    createNewUser,
}