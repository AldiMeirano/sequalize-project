const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./middleware/swagger.json");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
const product = require("./routers/productRouter");
const user = require("./routers/userRouter");
const book = require("./routers/bookRouter");
const transaction = require("./routers/transactionRoute");

app.use("/api/book", book);
app.use("/api/products", product);
app.use("/api/user", user);
app.use("/api/transaction", transaction);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
