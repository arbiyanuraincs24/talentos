const axios = require("axios");


const generateInterview = async (req, res) => {

    console.log("GENERATE API CALLED");


    try {


        const { role, difficulty, count } = req.body;



        console.log("Received from frontend:", {

            role,

            difficulty,

            count

        });




        if (!role || !difficulty) {


            return res.status(400).json({

                message: "Role and difficulty required"

            });


        }




        const questionCount = Number(count) || 5;



        console.log(

            "Requested Question Count:",

            questionCount

        );






        const prompt = `

Generate exactly ${questionCount} interview questions for a ${role} position.

Difficulty level: ${difficulty}


Return ONLY valid JSON.

Format:

[
  {
    "question": "Question text",
    "answer": "Detailed explanation answer"
  }
]


Rules:

1. Generate exactly ${questionCount} questions.
2. Do not generate more than ${questionCount}.
3. Return only JSON.
4. Do not add markdown.
5. Do not add explanations outside JSON.

`;






        const response = await axios.post(


            "https://openrouter.ai/api/v1/chat/completions",


            {


                model: "openrouter/free",


                messages: [


                    {


                        role: "system",


                        content:
                        "You are an expert technical interviewer."

                    },


                    {


                        role: "user",


                        content: prompt

                    }


                ]


            },


            {


                headers: {


                    "Authorization":
                    `Bearer ${process.env.OPENROUTER_API_KEY}`,


                    "Content-Type":
                    "application/json",


                    "HTTP-Referer":
                    "http://localhost:5173",


                    "X-Title":
                    "TalentOS"


                }


            }


        );






        let text = response.data.choices[0].message.content;



        text = text.replace(/```json/g, "");

        text = text.replace(/```/g, "");

        text = text.trim();





        let questions = JSON.parse(text);




        console.log(

            "AI Generated Questions:",

            questions.length

        );






        // Force selected number of questions

        questions = questions.slice(

            0,

            questionCount

        );






        console.log(

            "Sending To Frontend:",

            questions.length

        );







        res.status(200).json({


            role,


            difficulty,


            questions


        });





    }

    catch(error) {



        console.log(

            "OpenRouter Error:",

            error.response?.data || error.message

        );



        res.status(500).json({


            message:

            "AI generation failed",


            error:

            error.response?.data || error.message


        });


    }


};





module.exports = {

    generateInterview

};