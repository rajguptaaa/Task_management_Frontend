import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
                method: "POST",
                body: JSON.stringify({ email, fullName, otp, password }),
                headers: { "Content-Type": "application/json" },
            });

            const respObj = await resp.json();
            if (respObj.status === "Success") {
                navigate("/login");
            }
        } catch (err) {
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const enteredEmail = e.target.email.value;
        const enteredFullName = e.target.fullName.value;

        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/otps`, {
                method: "POST",
                body: JSON.stringify({ email: enteredEmail }),
                headers: { "Content-Type": "application/json" },
            });

            const respObj = await resp.json();
            if (respObj.status === "Success") {
                setEmail(enteredEmail);
                setFullName(enteredFullName);
                setIsOtpSent(true);
            }
        } catch (error) {
        }
    };

    return (
        <div>
            <h2>{isOtpSent ? "Complete Registration" : "Sign Up"}</h2>

            {isOtpSent ? (
                <form onSubmit={handleRegister}>
                    <label>Email:</label>
                    <input type="text" value={email} readOnly />

                    <label>Full Name:</label>
                    <input type="text" value={fullName} readOnly />

                    <label>OTP:</label>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />

                    <label>Password:</label>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <label>Confirm Password:</label>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                    <button type="submit">Register</button>
                </form>
            ) : (
                <form onSubmit={handleSendOtp}>
                    <label>Full Name:</label>
                    <input type="text" placeholder="Full Name" name="fullName" required />

                    <label>Email:</label>
                    <input type="email" placeholder="Email" name="email" required />

                    <button type="submit">Send OTP</button>
                </form>
            )}
        </div>
    );
};

export default SignUpPage;
