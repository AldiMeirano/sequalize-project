const express = require('express')
const cors = require('cors')


const app = express()

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// routers
const product = require('./routers/productRouter')
const user = require('./routers/userRouter')
const book = require("./routers/bookRouter");
app.use("/api/book", book);
app.use('/api/products', product)
app.use('/api/user', user)


const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})