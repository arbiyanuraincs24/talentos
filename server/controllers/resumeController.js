const pdfParse = require("pdf-parse");
const axios = require("axios");


const analyzeResume = async (req, res) => {

    try {

        console.log("🔥 Resume Analyzer API Hit");


        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Resume PDF required"
            });

        }


        if (!process.env.OPENROUTER_API_KEY) {

            return res.status(500).json({
                success: false,
                message: "OpenRouter API key missing"
            });

        }



        // Extract PDF Text

        const pdfData = await pdfParse(
            req.file.buffer
        );


        const resumeText = pdfData.text;


        console.log(
            "RESUME LENGTH:",
            resumeText.length
        );



        if (!resumeText || resumeText.trim().length === 0) {

            return res.status(400).json({

                success: false,

                message: "Could not extract resume text"

            });

        }




        const prompt = `

You are an ATS Resume Analyzer.

Analyze the resume below.

Return ONLY valid JSON.

Do not use markdown.
Do not use code blocks.
Do not add explanations.


Return exactly this format:

{
  "atsScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "missingKeywords": [],
  "grammarIssues": [],
  "projectImprovements": [],
  "recommendedRoles": []
}


Rules:

- atsScore must be between 0 and 100.
- summary should describe the candidate.
- strengths should contain positive resume points.
- weaknesses should contain improvement areas.
- missingSkills should contain missing technical skills.
- missingKeywords should contain ATS keywords.
- grammarIssues should contain writing issues.
- projectImprovements should contain suggestions.
- recommendedRoles should contain suitable roles.


Resume:

${resumeText}

`;



        console.log(
            "Sending request to OpenRouter..."
        );



        const response = await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {

                model:
                 "meta-llama/llama-3.1-8b-instruct",


                messages: [

                    {

                        role: "system",

                        content:
                        "Return only valid JSON. No markdown. No extra text."

                    },


                    {

                        role: "user",

                        content: prompt

                    }

                ],


                temperature: 0,


                max_tokens: 800

            },


            {

                headers: {

                    Authorization:
                    `Bearer ${process.env.OPENROUTER_API_KEY}`,


                    "Content-Type":
                    "application/json",


                    "HTTP-Referer":
                    "https://talentos62410-8t5v7bpjk-arbi1024.vercel.app",


                    "X-Title":
                    "TalentOS Resume Analyzer"

                }

            }

        );



        let aiResponse =
        response.data?.choices?.[0]?.message?.content;



        console.log(
            "RAW AI RESPONSE:",
            aiResponse
        );



        if (!aiResponse) {

            return res.status(500).json({

                success:false,

                message:"AI returned empty response"

            });

        }




        // Clean AI response

        aiResponse = aiResponse

        .replace(/```json/gi, "")

        .replace(/```/g, "")

        .trim();





        // Extract JSON

        const start =
        aiResponse.indexOf("{");


        const end =
        aiResponse.lastIndexOf("}");



        if(start !== -1 && end !== -1) {

            aiResponse =
            aiResponse.substring(
                start,
                end + 1
            );

        }




        console.log(
            "FINAL JSON:",
            aiResponse
        );




        let analysis;


        try {


            analysis = JSON.parse(
                aiResponse
            );


        }

        catch(error) {


            console.log(
                "JSON PARSE ERROR:",
                error.message
            );


            return res.status(500).json({

                success:false,

                message:"AI returned invalid JSON",

                raw: aiResponse

            });

        }




        return res.status(200).json({

            success:true,

            analysis

        });



    }


    catch(error) {


        console.log(
            "===== RESUME ERROR ====="
        );


        console.log(
            "MESSAGE:",
            error.message
        );


        console.log(
            "STATUS:",
            error.response?.status
        );


        console.log(
            "DATA:",
            error.response?.data
        );



        return res.status(500).json({

            success:false,

            message:"Resume analysis failed",

            error:
            error.response?.data || error.message

        });

    }

};



module.exports = {
    analyzeResume
};