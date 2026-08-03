import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

import "./Login.css";
import AuthContext from "../context/AuthContext.jsx";
import API from "../api/axios";

function Login() {

    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            if (isRegister) {

                const response = await API.post("/auth/register", {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });

                alert(response.data.message);

                setIsRegister(false);

                setFormData({
                    name: "",
                    email: "",
                    password: ""
                });

            } else {

                const response = await API.post("/auth/login", {
                    email: formData.email,
                    password: formData.password
                });

                login(response.data);

                alert("Login successful");

                navigate("/dashboard");
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Server error"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>
                    {isRegister ? "Create Account" : "Welcome Back"}
                </h1>

                <p>
                    {isRegister
                        ? "Register to begin your AI interview journey."
                        : "Login to continue your interview preparation."}
                </p>

                <form onSubmit={handleSubmit}>

                    {isRegister && (

                        <div className="input-box">

                            <User size={18} />

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    )}

                    <div className="input-box">

                        <Mail size={18} />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="input-box">

                        <Lock size={18} />

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>

                    </div>

                    <button
                        className="login-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : isRegister
                                ? "Create Account"
                                : "Login"}
                    </button>

                </form>

                <div className="toggle">

                    <span>

                        {isRegister
                            ? "Already have an account?"
                            : "Don't have an account?"}

                    </span>

                    <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                    >

                        {isRegister ? "Login" : "Register"}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Login;