const mongoose = require('mongoose')

const jobPost = mongoose.Schema({
    companyName: { type: String, required: true },
    position: { type: String, required: true, },
    contract: { type: String, required: true },
    location: { type: String, required: true },
} , {
    versionKey : false,
    timestamps : true
})

const jobModals = mongoose.model('jobPostCollection', jobPost)

module.exports = { jobModals }