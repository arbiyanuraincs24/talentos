import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar.jsx";
import "./History.css";


function History(){


    const [history,setHistory] = useState([]);

    const [loading,setLoading] = useState(true);




    const fetchHistory = async()=>{


        try{


            const user =
            JSON.parse(
                localStorage.getItem("user")
            );



            if(!user){


                setLoading(false);

                return;


            }





            const response = await API.get(

                `/history/${user.id}`

            );




            setHistory(

                response.data

            );



        }


        catch(error){


            console.log(

                error.response?.data ||

                error.message

            );


        }


        finally{


            setLoading(false);


        }


    };








    useEffect(()=>{


        const loadHistory = async()=>{


            await fetchHistory();


        };



        loadHistory();



    },[]);









    const calculateScore=(questions)=>{


        let total = 0;

        let count = 0;



        questions.forEach((q)=>{


            if(!isNaN(Number(q.score))){


                total += Number(q.score);

                count++;


            }


        });





        if(count === 0){


            return "Not evaluated";


        }




        return Math.round(total/count)+"/10";


    };









    if(loading){


        return(

            <>


            <Navbar />



            <div className="history-container">


                <h2>

                    Loading interview history...

                </h2>


            </div>



            </>


        );


    }









    return(


        <>



        <Navbar />





        <div className="history-container">





            <h1>

                Interview History

            </h1>





            <p className="subtitle">

                Review your previous AI interview sessions

            </p>








            {

            history.length === 0 &&



            <div className="empty-card">



                <h2>

                    No interviews yet

                </h2>




                <p>

                    Complete an AI interview to see your progress here.

                </p>



            </div>


            }









            <div className="history-grid">





            {

            history.map((item,index)=>(




                <div

                className="history-card"

                key={index}

                >





                    <div className="card-header">





                        <h2>

                            {item.role}

                        </h2>






                        <span className="difficulty">


                            {item.difficulty}


                        </span>





                    </div>









                    <div className="stats">






                        <div>


                            <small>

                                Questions

                            </small>




                            <h3>

                                {
                                item.questions.length
                                }

                            </h3>



                        </div>









                        <div>



                            <small>

                                Score

                            </small>






                            <h3>


                                {

                                calculateScore(

                                    item.questions

                                )

                                }


                            </h3>



                        </div>






                    </div>









                    <details>




                    <summary>

                        View Answers

                    </summary>








                    {


                    item.questions.map((q,i)=>(



                        <div

                        className="answer-card"

                        key={i}

                        >






                            <h4>


                                Q{i+1}. {q.question}


                            </h4>








                            <p>


                                <b>

                                Your Answer:

                                </b>



                                <br/>




                                {

                                q.userAnswer ||

                                "Not answered"

                                }



                            </p>









                            <p>



                                <b>

                                Score:

                                </b>



                                <br/>




                                {

                                q.score ||

                                "Not evaluated"

                                }




                            </p>









                            <p>



                                <b>

                                Feedback:

                                </b>



                                <br/>




                                {

                                q.feedback ||

                                "Not evaluated"

                                }





                            </p>






                        </div>




                    ))

                    }








                    </details>








                </div>





            ))

            }





            </div>






        </div>





        </>


    );


}



export default History;