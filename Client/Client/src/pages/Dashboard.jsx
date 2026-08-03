import { Link } from "react-router-dom";
import { useContext } from "react";

import Navbar from "../components/Navbar.jsx";
import AuthContext from "../context/AuthContext.jsx";

import {
    Brain,
    History,
    Trophy,
    Target,
    FileText
} from "lucide-react";

import "./Dashboard.css";

function Dashboard() {

    const { user } = useContext(AuthContext);

    return (
        <>
            <Navbar />

            <div className="dashboard">

                {/* Welcome Section */}
                <div className="welcome">
                    <h1>
                        Welcome {user?.name || "User"} 👋
                    </h1>

                    <p>
                        Practice interviews with AI and improve your technical skills.
                    </p>
                </div>

                {/* Statistics */}
                <div className="stats">

                    <div className="stat-card">
                        <Brain size={35} />
                        <div>
                            <h2>AI Interviews</h2>
                            <p>Generate practice interviews</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <Trophy size={35} />
                        <div>
                            <h2>Performance</h2>
                            <p>Track your improvement</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <Target size={35} />
                        <div>
                            <h2>Skills</h2>
                            <p>Improve daily</p>
                        </div>
                    </div>

                </div>

                {/* Quick Actions */}
                <div className="actions">

                    <h2>Quick Actions</h2>

                    <div className="action-grid">

                        <Link
                            to="/setup-interview"
                            className="action-card"
                        >
                            <Brain size={30} />

                            <h3>Start AI Interview</h3>

                            <p>
                                Create a new personalized interview
                            </p>
                        </Link>

                        <Link
                            to="/history"
                            className="action-card"
                        >
                            <History size={30} />

                            <h3>Interview History</h3>

                            <p>
                                Review your previous attempts
                            </p>
                        </Link>

                        <Link
                            to="/resume-analyzer"
                            className="action-card"
                        >
                            <FileText size={30} />

                            <h3>Resume Analyzer</h3>

                            <p>
                                Upload your resume and receive an AI-powered ATS score with improvement suggestions.
                            </p>
                        </Link>

                    </div>

                </div>

                {/* Tips */}
                <div className="tips">

                    <h2>AI Interview Tips</h2>

                    <ul>
                        <li>Explain your approach clearly</li>
                        <li>Practice technical concepts regularly</li>
                        <li>Analyze AI feedback after every interview</li>
                    </ul>

                </div>

            </div>
        </>
    );
}

export default Dashboard;