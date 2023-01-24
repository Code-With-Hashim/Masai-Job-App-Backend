const express = require('express')

const { authModals } = require('../modals/Authenticated.modals')
const { jobModals } = require("../modals/jobPost.modal")
const { authMiddlewares } = require('../middlewares/auth.middlewares')

const jobPostRouter = express.Router()
jobPostRouter.use(authMiddlewares)

jobPostRouter.post("/", async (req, res) => {

    const { companyName, position, contract, location, UserID } = req.body

    try {

        const isAdminExist = await authModals.findOne({ _id: UserID })

        if (isAdminExist.profile !== 'admin') {
            res.status(403).send({
                message: "You're not authorized for this action",
                status: false
            })
        } else {
            await jobModals.create({ companyName, position, contract, location })

            res.send({
                message: 'Job Post Create Successfully',
                status: 'Ok'
            })
        }

    } catch (error) {
        console.log(error)
        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})

jobPostRouter.patch("/:id", async (req, res) => {

    const {id} = req.params
    let { companyName, position, contract, location, UserID } = req.body

    if (companyName === "") companyName = undefined
    if (position === "") position = undefined
    if (contract === "") contract = undefined
    if (location === "") location = undefined

    try {

        const isAdminExist = await authModals.findOne({ _id: UserID })

        if (isAdminExist.profile !== 'admin') {
            res.status(403).send({
                message: "You're not authorized for this action",
                status: false
            })
        } else {
            await jobModals.findByIdAndUpdate({ _id: id }, { companyName, position, contract, location })

            res.send({
                message: 'Job Post Edit Successfully',
                status: false
            })
        }

    } catch (error) {
        console.log(error)
        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})

jobPostRouter.delete("/:id", async (req, res) => {

    const {id} = req.params
    let { UserID } = req.body


    try {

        const isAdminExist = await authModals.findOne({ _id: UserID })

        if (isAdminExist.profile !== 'admin') {
            res.status(403).send({
                message: "You're not authorized for this action",
                status: false
            })
        } else {
            await jobModals.findByIdAndDelete({ _id: id })

            res.send({
                message: 'Job Post Delete Successfully',
                status: false
            })
        }

    } catch (error) {

        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})

jobPostRouter.get("/", async (req, res) => {

    const { companyName, location, contract } = req.query



    try {

        if (companyName && contract && location) {

            const jobPost = await jobModals.find({ companyName: { $regex : companyName } , contract , location })

            res.send(jobPost)

        } else if (companyName) {
            const jobPost = await jobModals.find({ companyName: { $regex : companyName } })

            res.send(jobPost)

        } else if (location) {
            const jobPost = await jobModals.find({ location })

            res.send(jobPost)
        } else if (contract) {
            const jobPost = await jobModals.find({ contract })

            res.send(jobPost)
        } else {
            const jobPost = await jobModals.find()

            res.send(jobPost)
        }


    } catch (error) {
        console.log(error)
        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})


module.exports = { jobPostRouter }