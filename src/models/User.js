const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

UserSchema.methods.encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        return console.log(error)
    }
};

UserSchema.methods.matchPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        return console.log(error)
    }
};

module.exports = model('User', UserSchema);