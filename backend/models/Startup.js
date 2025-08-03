const {Schema, model} = require('mongoose')

const Startup = new Schema({
    founder: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    team: {type: String, required: true}
})

module.exports = model('Startup', Startup)