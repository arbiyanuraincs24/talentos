import "./AnalysisCard.css";


function AnalysisCard({ icon, title, content }) {


    return (

        <div className="analysis-card">


            <div className="analysis-title">

                {icon}

                <h3>
                    {title}
                </h3>

            </div>




            {

                Array.isArray(content) && content.length > 0

                ?

                <ul>

                    {
                        content.map((item, index) => (

                            <li key={index}>
                                {item}
                            </li>

                        ))
                    }

                </ul>


                :


                typeof content === "string" && content.trim() !== ""

                ?

                <p>
                    {content}
                </p>


                :


                <p>
                    No information available
                </p>

            }



        </div>

    );

}


export default AnalysisCard;