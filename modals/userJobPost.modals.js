const mongoose = require('mongoose')

const userJobPost = mongoose.Schema({
    companyName: { type: String, required: true },
    position: { type: String, required: true, },
    contract: { type: String, required: true },
    location: { type: String, required: true },
    UserID: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
})

const userJobModal = mongoose.model('appliedCollection', userJobPost)

module.exports = { userJobModal }