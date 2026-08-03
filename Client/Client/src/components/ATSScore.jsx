import "./ATSScore.css";


function ATSScore({ score }) {


    const percentage = score || 0;


    return (

        <div className="ats-card">


            <h2>
                ATS Score
            </h2>



            <div className="score-number">

                {percentage}

                <span>
                    /100
                </span>

            </div>



            <div className="progress-container">


                <div

                    className="progress-fill"

                    style={{
                        width: `${percentage}%`
                    }}

                >

                </div>


            </div>



            <h3>

                {
                    percentage >= 80

                    ?

                    "Excellent Resume"

                    :

                    percentage >= 60

                    ?

                    "Good Resume"

                    :

                    "Needs Improvement"

                }

            </h3>


        </div>

    );

}


export default ATSScore;