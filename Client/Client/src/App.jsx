import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Interview from "./pages/Interview.jsx";
import History from "./pages/History.jsx";
import InterviewSetup from "./pages/InterviewSetup.jsx";
import ResumeAnalyzer from "./pages/ResumeAnalyzer.jsx";



function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Landing Page */}
        <Route
          path="/"
          element={<Home />}
        />



        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />



        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />



        {/* AI Interview */}
        <Route
          path="/interview"
          element={<Interview />}
        />



        {/* Create Interview */}
        <Route
          path="/setup-interview"
          element={<InterviewSetup />}
        />



        {/* Interview History */}
        <Route
          path="/history"
          element={<History />}
        />



        {/* Resume Analyzer */}
        <Route
          path="/resume-analyzer"
          element={<ResumeAnalyzer />}
        />



        {/* Any wrong URL goes to Home */}
        <Route
          path="*"
          element={<Home />}
        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;