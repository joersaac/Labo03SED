const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to DB');
        })
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });
};