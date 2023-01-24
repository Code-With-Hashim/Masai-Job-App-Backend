const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String, enum: ['admin', 'user'], required: true }
})

const authModals = mongoose.model('authCollection', authSchema)

module.exports = { authModals }