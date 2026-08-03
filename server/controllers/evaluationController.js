const axios = require("axios");

const evaluateAnswer = async (req, res) => {

    try {

        const {
            question,
            userAnswer
        } = req.body;


        if (!question || !userAnswer) {

            return res.status(400).json({
                message: "Question and answer are required"
            });

        }


        const prompt = `
You are an expert technical interviewer.

Question:
${question}

Candidate Answer:
${userAnswer}

Evaluate the candidate's answer.

Return ONLY valid JSON in this exact format:

{
  "score": 85,
  "feedback": "Overall feedback about the answer.",
  "strengths": [
    "Strength 1",
    "Strength 2"
  ],
  "weaknesses": [
    "Weakness 1",
    "Weakness 2"
  ],
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2"
  ],
  "correctAnswer": "A detailed ideal answer."
}

Rules:
- Score must be an integer between 0 and 100.
- Return only JSON.
- Do not include markdown.
- Do not wrap the JSON in triple backticks.
`;


        const response = await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {

                model: "openrouter/free",

                messages: [

                    {
                        role: "system",
                        content: "You are an expert technical interviewer. Always return valid JSON."
                    },

                    {
                        role: "user",
                        content: prompt
                    }

                ]

            },

            {

                headers: {

                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type": "application/json"

                }

            }

        );


        let result = response.data.choices[0].message.content;

        result = result.replace(/```json/g, "");
        result = result.replace(/```/g, "").trim();

        const evaluation = JSON.parse(result);


        res.json({

            score: evaluation.score || 0,

            feedback: evaluation.feedback || "",

            strengths: evaluation.strengths || [],

            weaknesses: evaluation.weaknesses || [],

            suggestions: evaluation.suggestions || [],

            correctAnswer: evaluation.correctAnswer || ""

        });

    }

    catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({

            message: "Evaluation failed"

        });

    }

};

module.exports = {
    evaluateAnswer
};