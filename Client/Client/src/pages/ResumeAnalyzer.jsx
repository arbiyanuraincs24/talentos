import { useState } from "react";

import Navbar from "../components/Navbar.jsx";
import ResumeUpload from "../components/ResumeUpload.jsx";
import ATSScore from "../components/ATSScore.jsx";
import AnalysisCard from "../components/AnalysisCard.jsx";

import {
    FileText,
    Sparkles,
    Target,
    AlertCircle,
    CheckCircle,
    XCircle,
    Lightbulb
} from "lucide-react";

import "./ResumeAnalyzer.css";



function ResumeAnalyzer() {


    const [analysis, setAnalysis] = useState(null);



    return (

        <>


            <Navbar />



            <div className="resume-container">



                <div className="resume-header">


                    <FileText size={45}/>


                    <h1>
                        AI Resume Analyzer
                    </h1>



                    <p>
                        Upload your resume and get AI-powered ATS score,
                        missing skills, keywords and improvement suggestions.
                    </p>


                </div>





                <ResumeUpload

                    setAnalysis={setAnalysis}

                />






                {

                    analysis &&


                    <div className="analysis-section">





                        <ATSScore

                            score={analysis.atsScore}

                        />







                        <div className="analysis-grid">





                            <AnalysisCard

                                icon={<Sparkles />}

                                title="Resume Summary"

                                content={analysis.summary}

                            />






                            <AnalysisCard

                                icon={<CheckCircle />}

                                title="Strengths"

                                content={analysis.strengths}

                            />







                            <AnalysisCard

                                icon={<XCircle />}

                                title="Weaknesses"

                                content={analysis.weaknesses}

                            />







                            <AnalysisCard

                                icon={<Target />}

                                title="Missing Skills"

                                content={analysis.missingSkills}

                            />







                            <AnalysisCard

                                icon={<AlertCircle />}

                                title="Grammar Issues"

                                content={analysis.grammarIssues}

                            />







                            <AnalysisCard

                                icon={<CheckCircle />}

                                title="Missing Keywords"

                                content={analysis.missingKeywords}

                            />







                            <AnalysisCard

                                icon={<Lightbulb />}

                                title="Project Improvements"

                                content={analysis.projectImprovements}

                            />






                            <AnalysisCard

                                icon={<FileText />}

                                title="Recommended Roles"

                                content={analysis.recommendedRoles}

                            />





                        </div>


                    </div>


                }





            </div>


        </>

    );

}



export default ResumeAnalyzer;