const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { authModals } = require("../modals/Authenticated.modals")

const SECRET_KEY = process.env.SECRET_KEY

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {

    const { name, email, password } = req.body
    let profile;

    if (email.includes("@masaischool.com")) {
        profile = 'admin'
    } else {
        profile = 'user'
    }
    try {
        const existingUser = await authModals.findOne({ email })

        if (existingUser) {
            res.status(403).send({
                message: `${profile} is already been registered with this email ID`,
                status: 'false'
            })
        } else {
            bcrypt.hash(password, 5, async function (err, hash) {
                if (err) {
                    res.status(404).send({
                        message: 'Something went wrong , Please try again',
                        status: 'false'
                    })
                } else {
                    try {

                        await authModals.create({ email, password: hash, name , profile})

                        res.status(200).send({
                            message: `${profile} account create successfully`,
                            status: 'Ok'
                        })

                    } catch (error) {

                        res.status(404).send({
                            message: 'Something went wrong , Please try again',
                            status: 'false'
                        })

                    }
                }
            });
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({
            message: 'Something went wrong , Please try again',
            status: 'false'
        })

    }

})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {

        const isUserExist = await authModals.findOne({ email })

        if (isUserExist) {
            bcrypt.compare(password, isUserExist.password, function (err, result) {
                var token = jwt.sign({ UserId: isUserExist._id }, SECRET_KEY);

                if (result) {
                    res.status(200).send({
                        message: 'Login Successfully',
                        token,
                        status: 'ok'
                    })
                } else {
                    res.status(401).send({
                        message: 'Wrong Credential',
                        status: 'false'
                    })
                }

            });
        } else {
            res.status(401).send({
                message: 'Wrong Credential',
                status: 'false'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(404).send({
            message: 'Something went wrong , Please try again',
            status: 'false'
        })
    }
})

module.exports = { authRouter }