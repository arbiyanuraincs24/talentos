const Interview = require("../models/Interview");



const getHistory = async(req,res)=>{


    try{


        const { userId } = req.params;



        const history = await Interview.find({

            userId:userId

        })
        .sort({
            createdAt:-1
        });



        res.json(history);



    }


    catch(error){


        console.log(
            error.message
        );


        res.status(500).json({

            message:"Failed to get history"

        });


    }


};




module.exports = {

    getHistory

};