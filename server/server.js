const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();


console.log(
    "OPENROUTER KEY:",
    process.env.OPENROUTER_API_KEY ? "Loaded" : "Missing"
);


console.log(
    "MONGO URI:",
    process.env.MONGO_URI ? "Loaded" : "Missing"
);


// Routes

const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const interviewSaveRoutes = require("./routes/interviewSaveRoutes");
const historyRoutes = require("./routes/historyRoutes");
const resumeRoutes = require("./routes/resumeRoutes");


const app = express();


// =======================
// Middleware
// =======================

app.use(
    cors({
        origin: true,
        credentials: true
    })
);


app.use(express.json());


app.use(
    express.urlencoded({
        extended: true
    })
);


// =======================
// API Routes
// =======================

app.use("/api/auth", authRoutes);

app.use("/api/interview", interviewRoutes);

app.use("/api/evaluation", evaluationRoutes);

app.use("/api/interview", interviewSaveRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/resume", resumeRoutes);


// =======================
// Health Check
// =======================

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "AI Interview Backend Running"

    });

});


// =======================
// MongoDB Connection
// =======================

mongoose
.connect(process.env.MONGO_URI)

.then(() => {

    console.log(
        "✅ MongoDB Connected"
    );

})

.catch((error) => {

    console.log(
        "❌ MongoDB Error:",
        error.message
    );

});


// =======================
// 404 Handler
// =======================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "API route not found"

    });

});


// =======================
// Global Error Handler
// =======================

app.use((err, req, res, next) => {

    console.error(
        "SERVER ERROR:",
        err.message
    );


    res.status(500).json({

        success: false,

        message: err.message

    });

});


// =======================
// Server Start
// =======================

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `🚀 Server running on port ${PORT}`
    );

});