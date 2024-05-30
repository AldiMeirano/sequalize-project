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
const transaction = require("./routers/transactionRoute");
app.use("/api/book", book);
app.use("/api/products", product);
app.use("/api/user", user);
app.use("/api/transaction", transaction);

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})