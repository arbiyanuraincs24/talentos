const Interview = require("../models/Interview");



const saveInterview = async(req,res)=>{


    try{


        console.log("Received Data:");
        console.log(req.body);



        const {

            userId,

            role,

            difficulty,

            questions


        } = req.body;




        if(!userId || !role || !difficulty || !questions){


            return res.status(400).json({

                message:"Missing required fields"

            });


        }





        const interview = new Interview({

            userId,

            role,

            difficulty,

            questions

        });





        await interview.save();





        res.status(201).json({

            message:"Interview saved successfully",

            interview

        });



    }


    catch(error){


        console.log(
            "Save Error:",
            error.message
        );



        res.status(500).json({

            message:"Saving failed",

            error:error.message

        });



    }


};



module.exports = {

    saveInterview

};