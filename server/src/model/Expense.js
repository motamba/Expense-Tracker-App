const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");


//Schema
const expenseSchema = mongoose.Schema({
    title: {
        required: [true, "Title is required"],
        type: String,
    },
    description: {
        required: [true, "Description is required"],
        type: String,
    },
    type: {
        type: String,
        default: "expense",
    },
    amount: {
        required: [true, "Amount is required"],
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
   },
   createdAt: {
    type: Date,
    default: new Date(),
}
},
{
    timestamp: true,
    toJSON: {
         virtuals: true, 
        },
    toObject: { 
        virtuals: true,
     },
}

    
    
);

//Pagination
expenseSchema.plugin(mongoosePaginate);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;