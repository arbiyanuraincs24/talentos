import { useState } from "react";
import { useLocation } from "react-router-dom";

import API from "../api/axios";
import Navbar from "../components/Navbar.jsx";
import EvaluationResult from "../components/EvaluationResult";

import "./Interview.css";


function Interview() {


    const location = useLocation();

    const setupData = location.state;



    const [role] = useState(
        setupData?.role || "Software Engineer"
    );


    const [difficulty] = useState(
        setupData?.difficulty || "Easy"
    );


    const [questions, setQuestions] = useState([]);


    const [loading, setLoading] = useState(false);


    const [answers, setAnswers] = useState({});


    const [evaluations, setEvaluations] = useState({});





    // Generate AI Questions

    const generateQuestions = async () => {


        try {


            setLoading(true);


            setQuestions([]);

            setAnswers({});

            setEvaluations({});



            const response = await API.post(

                "/interview/generate",

                {
                    role,

                    difficulty,

                    count: setupData?.count || 5
                }

            );



            setQuestions(
                response.data.questions
            );


        }


        catch(error) {


            console.log(
                error.response?.data ||
                error.message
            );


            alert(
                "Failed to generate questions"
            );


        }


        finally {


            setLoading(false);


        }


    };






    // Handle Answer Change

    const handleAnswerChange = (index, value) => {


        setAnswers({

            ...answers,

            [index]: value

        });


    };







    // Evaluate Answer

    const evaluateAnswer = async(index) => {


        try {


            const response = await API.post(

                "/evaluation/evaluate",

                {

                    question:
                    questions[index].question,


                    userAnswer:
                    answers[index] || ""

                }

            );



            setEvaluations({

                ...evaluations,

                [index]: response.data

            });


        }


        catch(error) {


            console.log(

                error.response?.data ||

                error.message

            );


            alert(

                "Evaluation failed"

            );


        }


    };








    // Save Interview History

    const saveInterview = async() => {


        try {


            const user = JSON.parse(

                localStorage.getItem("user")

            );



            const userId =

            user?.id ||

            user?._id;



            if(!userId) {


                alert(

                    "Please login again"

                );


                return;

            }





            const interviewData = {


                userId,


                role,


                difficulty,



                questions:

                questions.map((item,index)=>(

                    {


                        question:

                        item.question,


                        userAnswer:

                        answers[index] || "",



                        score:

                        evaluations[index]?.score || 0,



                        feedback:

                        evaluations[index]?.feedback || "",



                        strengths:

                        evaluations[index]?.strengths || [],



                        weaknesses:

                        evaluations[index]?.weaknesses || [],



                        suggestions:

                        evaluations[index]?.suggestions || []

                    }


                ))

            };




            const response = await API.post(

                "/interview/save",

                interviewData

            );



            alert(

                response.data.message

            );


        }


        catch(error) {


            console.log(

                error.response?.data ||

                error.message

            );


            alert(

                "Interview save failed"

            );


        }


    };



    return (

        <>

            <Navbar />


            <div className="interview">


                <div className="interview-header">


                    <h1>

                        AI Interview Session

                    </h1>



                    <p>

                        Role: {role} | Difficulty: {difficulty}

                    </p>



                    <p className="count-badge">

                        Questions: {setupData?.count || 5}

                    </p>


                </div>





                <button

                    className="generate-btn"

                    onClick={generateQuestions}

                    disabled={loading}

                >

                    {

                    loading

                    ? "Generating..."

                    : "Generate Questions"

                    }


                </button>



                <div className="questions">

                {
                    questions.map((item,index)=>(


                        <div

                            className="question-card"

                            key={index}

                        >



                            <h3>

                                Question {index + 1}

                            </h3>




                            <p>

                                {item.question}

                            </p>





                            <textarea


                                rows="5"


                                placeholder="Write your answer here..."


                                value={

                                    answers[index] || ""

                                }



                                onChange={(e)=>

                                    handleAnswerChange(

                                        index,

                                        e.target.value

                                    )

                                }


                            />






                            <button


                                className="evaluate-btn"


                                onClick={() => evaluateAnswer(index)}


                            >

                                Evaluate Answer


                            </button>







                            {
                                evaluations[index] && (

                                    <EvaluationResult

                                        evaluation={

                                            evaluations[index]

                                        }

                                    />

                                )
                            }







                            {
                                evaluations[index] && (

                                    <>


                                        <div className="feedback-box">


                                            <h4>

                                                ✅ Strengths

                                            </h4>



                                            <ul>


                                                {

                                                evaluations[index]
                                                ?.strengths
                                                ?.map((item,i)=>(


                                                    <li key={i}>

                                                        {item}

                                                    </li>


                                                ))

                                                }


                                            </ul>


                                        </div>







                                        <div className="feedback-box">


                                            <h4>

                                                ⚠ Weaknesses

                                            </h4>



                                            <ul>


                                                {

                                                evaluations[index]
                                                ?.weaknesses
                                                ?.map((item,i)=>(


                                                    <li key={i}>

                                                        {item}

                                                    </li>


                                                ))

                                                }


                                            </ul>


                                        </div>







                                        <div className="feedback-box">


                                            <h4>

                                                🚀 Suggestions

                                            </h4>



                                            <ul>


                                                {

                                                evaluations[index]
                                                ?.suggestions
                                                ?.map((item,i)=>(


                                                    <li key={i}>

                                                        {item}

                                                    </li>


                                                ))

                                                }


                                            </ul>


                                        </div>


                                    </>

                                )
                            }





                        </div>


                    ))

                }



                </div>







                {

                    questions.length > 0 &&


                    <button


                        className="save-btn"


                        onClick={saveInterview}


                    >

                        Save Interview History


                    </button>


                }





            </div>


        </>


    );


}



export default Interview;