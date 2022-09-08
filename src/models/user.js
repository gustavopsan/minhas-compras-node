const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: "String",
        email: { type: "String", unique: true },
        password: "String",
        avatarUrl: "String",
        isActive: "Boolean",
        lists: "Array"
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;