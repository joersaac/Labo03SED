/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const User = require('../../models/UserModel');
const { registerValidator } = require('./UserValidator');

const UserController = {

    register: async (req, res) => {
        try {
            await registerValidator(req.body);

            const pass = await bcrypt.hash(req.body.password, 10);
            req.body.password = pass;

            const user = await User.create(req.body);

            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findOneAndDelete({ _id: req.user._id });

            return res.status(200).json({ error: false, message: 'Delete successfully' });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const { page = 1, limit = 12 } = req.query;

            const users = await User.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await User.countDocuments();

            return res.status(200).json({
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                users,
            });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    getCurrentUser: async (req, res) => {
        const user = await User.findOne({ _id: req.user._id });

        return res.status(200).json(user);
    },

};

module.exports = UserController;