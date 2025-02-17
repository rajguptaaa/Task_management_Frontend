import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/LoginPage.css';

const LoginPage = ({afterLogin}) => {

    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginFunction = async (e) => {
        e.preventDefault();

        try {
            const resLogin = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/login", {
                method: "POST",
                credentials:'include',
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const respObj = await resLogin.json();
            console.log(respObj);
            console.log(resLogin);
            if(respObj.status === "Success"){
                afterLogin(respObj);
            }else{
                alert(respObj.message);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }

            
    };

    return (
        <div className='main-form-div'>
            <form onSubmit={loginFunction}>
                <label>Enter Email</label>
                <input
                    type='text'
                    placeholder='Enter Email here'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type='password'
                    placeholder='Enter Password here'
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