const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require ("./config/dbConnect");
const userRoute = require("./routes/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const incomeRoute = require("./routes/income/incomeRoute");
const expenseRoute = require("./routes/expenses/expenseRoute");
const accountStatsRoute = require("./routes/accountStatsRoute/accountStatsRoute");

const app = express();

//env
dotenv.config();

//dbConnect
dbConnect();

//Middlewares
app.use(express.json());
app.use(cors());

//Users Routes
app.use("/api/users", userRoute);

//Account Stats
app.use("/", accountStatsRoute);

//Income Routes
app.use("/api/income", incomeRoute);

//Expense Routes
app.use("/api/expenses", expenseRoute);

//Error
app.use(notFound);
app.use(errorHandler);


module.exports = app;