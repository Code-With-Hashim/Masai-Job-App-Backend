const express = require('express')

const { authModals } = require('../modals/Authenticated.modals')
const { userJobModal } = require("../modals/userJobPost.modals")
const { authMiddlewares } = require('../middlewares/auth.middlewares')

const userJobPostRouter = express.Router()
userJobPostRouter.use(authMiddlewares)

userJobPostRouter.post("/", async (req, res) => {

    const { companyName, position, contract, location, UserID } = req.body

    try {

        await userJobModal.create({ companyName, position, contract, location, UserID })

        res.send({
            message: 'Job Applied Successfully',
            status: 'Ok'
        })


    } catch (error) {
        console.log(error)
        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})

userJobPostRouter.get("/", async (req, res) => {

    const { UserID } = req.body

    try {

       const userJob =  await userJobModal.findOne({ UserID })

        res.send(userJob)


    } catch (error) {
        console.log(error)
        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})



module.exports = { userJobPostRouter }