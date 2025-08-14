const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    fullname: {type: String},
    about: {type: String},
    skills: {type: String},
    contacts: [{
        name: {type: String},
        link: {type: String}
    }],
    followersCount: {type: Number, default: 0},
    followingCount: {type: Number, default: 0}
})

module.exports = model('User', User)