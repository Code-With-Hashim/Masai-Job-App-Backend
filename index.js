require('dotenv').config()
const express = require('express')


const { connect } = require('./config/db')
const { authRouter } = require('./routes/Authenticated.routes')
const { jobPostRouter } = require('./routes/jobPost.routes')
const {userJobPostRouter} = require("./routes/userJobPost.routes")

const PORT = process.env.PORT
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", authRouter)
app.use("/job" , jobPostRouter)
app.use("/applied" , userJobPostRouter)


app.get('/', (req, res) => res.send({ message: 'Hello World' }))
app.listen(PORT, async () => {
    try {
        await connect
        console.log('Database is Connected Successfully')
        console.log(`Listening on http://localhost:${PORT}`)
    } catch (error) {

    }
})