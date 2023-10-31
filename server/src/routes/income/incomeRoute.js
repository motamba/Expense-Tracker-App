const express = require("express");
const {createInCtrl, fetchAllInCtrl, fetchInDetailsCtrl, updateInCtrl, deleteInCtrl} = require("../../controllers/income/incomeCtrl");
const authMiddleware = require("../../middlewares/authMiddleware");

const incomeRoute = express.Router();

incomeRoute.post("/",authMiddleware, createInCtrl)
incomeRoute.get("/",authMiddleware, fetchAllInCtrl)
incomeRoute.get("/:id",authMiddleware, fetchInDetailsCtrl)
incomeRoute.put("/:id",authMiddleware, updateInCtrl)
incomeRoute.delete("/:id",authMiddleware, deleteInCtrl)


module.exports = incomeRoute;