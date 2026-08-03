import { useState } from "react";
import API from "../api/axios.js";

import {
    Upload,
    FileText,
    X
} from "lucide-react";

import "./ResumeUpload.css";


function ResumeUpload({ setAnalysis = () => {} }) {


    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    const selectFile = (event) => {

        const selectedFile = event.target.files[0];


        if (!selectedFile) {
            return;
        }


        if (selectedFile.type !== "application/pdf") {

            alert("Please upload PDF file only");

            event.target.value = "";

            return;

        }


        setError("");

        setFile(selectedFile);

    };




    const removeFile = () => {

        setFile(null);

        setError("");

    };





    const analyzeResume = async () => {


        if (!file) {

            setError("Please select a resume");

            return;

        }



        const formData = new FormData();


        formData.append(
            "resume",
            file
        );



        try {


            setLoading(true);

            setError("");



            const response = await API.post(

                "/resume/analyze",

                formData

            );



            console.log(
                "ANALYSIS RESPONSE:",
                response.data
            );



            if (response.data.success) {


                setAnalysis(

                    response.data.analysis

                );


            } 
            else {


                setError(

                    response.data.message ||

                    "Analysis failed"

                );


            }




        } 
        catch (error) {


            console.log(

                "UPLOAD ERROR:",

                error.response?.data ||

                error.message

            );



            setError(

                error.response?.data?.message ||

                "Something went wrong"

            );


        } 
        finally {


            setLoading(false);


        }


    };







    return (

        <div className="upload-container">



            <label className="upload-box">


                <Upload size={45}/>



                <h3>
                    Upload Resume PDF
                </h3>



                <p>
                    Click or drag your resume here
                </p>



                <input

                    type="file"

                    accept="application/pdf"

                    onChange={selectFile}

                />


            </label>






            {
                file &&


                <div className="file-preview">


                    <FileText size={25}/>



                    <span>
                        {file.name}
                    </span>




                    <button

                        type="button"

                        onClick={removeFile}

                    >

                        <X size={20}/>


                    </button>



                </div>

            }







            {
                error &&


                <p className="error-message">

                    {error}

                </p>

            }







            <button


                className="analyze-button"


                onClick={analyzeResume}


                disabled={loading}


            >


                {

                    loading

                    ?

                    "Analyzing..."

                    :

                    "Analyze Resume"

                }



            </button>





        </div>

    );

}


export default ResumeUpload;