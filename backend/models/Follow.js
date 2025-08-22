const { Schema, model, Types } = require('mongoose');

const Follow = new Schema({
	follower: { type: Types.ObjectId, ref: 'User', required: true },
	following: { type: Types.ObjectId, ref: 'User', reguired: true },
});

Follow.index({ follower: 1, following: 1 }, { unique: true });

module.exports = model('Follow', Follow);
