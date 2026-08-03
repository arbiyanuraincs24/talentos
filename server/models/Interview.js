const mongoose = require("mongoose");


const interviewSchema = new mongoose.Schema({


    userId:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },


    role:{

        type:String,

        required:true

    },


    difficulty:{

        type:String,

        required:true

    },


    questions:[

        {

            question:String,


            userAnswer:String,


            score:String,


            feedback:String,


            correctAnswer:String

        }

    ],



    createdAt:{

        type:Date,

        default:Date.now

    }


});



module.exports =
mongoose.model(
"Interview",
interviewSchema
);