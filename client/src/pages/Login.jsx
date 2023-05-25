import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8800/login', credentials);
          const token = response.data.token;
          const userId = response.data.userId; // Assuming the backend sends the user ID upon successful login
          console.log(userId);
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId); // Store the user ID in local storage
          navigate('/movies');
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <>
            <div className="form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div>
                <button>
                    <Link to="/register">Don't have an account?</Link>
                </button>
            </div>
        </>
    );
}

export default Login;
