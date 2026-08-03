import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Brain } from "lucide-react";

import Navbar from "../components/Navbar.jsx";
import "./InterviewSetup.css";


function InterviewSetup() {


  const navigate = useNavigate();



  const [role, setRole] = useState("");

  const [difficulty, setDifficulty] = useState("");

  const [questions, setQuestions] = useState(5);





  const roles = [

    "Software Engineer",

    "Frontend Developer",

    "Backend Developer",

    "Data Scientist",

    "Java Developer",

    "Python Developer"

  ];







  const startInterview = () => {



    if (!role || !difficulty) {


      alert(
        "Please select role and difficulty"
      );


      return;


    }






    navigate("/interview", {


      state: {


        role: role,

        difficulty: difficulty,

        count: questions


      }


    });



  };







  return (


    <div className="setup-page">



      <Navbar />




      <div className="setup-container">



        <h1>
          Create Your AI Interview
        </h1>



        <p>
          Customize your interview experience and practice with TalentOS AI.
        </p>







        <h2>
          Choose Job Role
        </h2>





        <div className="role-grid">



          {
            roles.map((item)=>(


              <div


                key={item}


                className={

                  role === item

                  ? "role-card selected"

                  : "role-card"

                }


                onClick={() => setRole(item)}


              >


                <Briefcase size={30}/>


                <span>
                  {item}
                </span>


              </div>



            ))
          }



        </div>








        <h2>
          Select Difficulty
        </h2>





        <div className="difficulty">



          {

            ["Easy","Medium","Hard"].map((level)=>(


              <button


                key={level}


                className={

                  difficulty === level

                  ? "active-level"

                  : ""

                }


                onClick={() => setDifficulty(level)}


              >


                {level}


              </button>



            ))

          }



        </div>









        <h2>
          Number of Questions
        </h2>





        <div className="question-options">



          {

            [5,10,15].map((num)=>(


              <button


                key={num}


                className={

                  questions === num

                  ? "active-level"

                  : ""

                }


                onClick={() => setQuestions(num)}



              >


                {num} Questions



              </button>



            ))

          }



        </div>









        <button


          className="generate-btn"


          onClick={startInterview}



        >


          <Brain size={22}/>


          Generate AI Interview



        </button>





      </div>



    </div>



  );

}



export default InterviewSetup;