import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/LoginPage.css';

const LoginPage = () => {

    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isloggedin, setIsLoggedIn] = useState(false);

    const loginFunction = async (e) => {
        e.preventDefault();

        try {
            const resLogin = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/login", {
                // method:"GET",
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await resLogin.json();

            if (data.status === "Success") {
                setIsLoggedIn(true);
                navigate('/tasks');
            } else {
                alert(`Login failed: ${data.message}`);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div className='main-form-div'>
            <form onSubmit={loginFunction}>
                <input
                    type='text'
                    placeholder='Enter Email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type='password'
                    placeholder='Enter Password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className='login-btn' type='submit'>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
