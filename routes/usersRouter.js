const passport = require('passport');
const express = require('express');

const router = express.Router();
const {
    register, deleteUser, getAllUsers, getCurrentUser,
} = require('../controllers/UserController');

const options = { session: false };

router.post('/register', register);

router.get('/current', passport.authenticate('bearer', options), getCurrentUser);
router.get('/', passport.authenticate('bearer', options), getAllUsers);

router.delete('/delete-user', passport.authenticate('bearer', options), deleteUser);

module.exports = router;