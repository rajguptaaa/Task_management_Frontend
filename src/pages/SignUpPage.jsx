import { useState } from "react"
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (e.target.password.value !== e.target.confirmPassword.value) {
            alert("Password does not match!");
            return;
        }

        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                fullName,
                otp: e.target.otp.value,
                password: e.target.password.value,
            }),
            headers: {
                "content-type": "application/json",
            },
        });

        console.log(resp);
        const respObj = await resp.json();
        console.log(respObj);
        if(respObj.status==="Success"){
                navigate("/login");
        }else{

        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const enteredEmail = e.target.email.value;

        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/otps", {
                method: "POST",
                body: JSON.stringify({ email: enteredEmail }),
                headers: { "Content-Type": "application/json" },
            });

            const respObj = await resp.json();
            console.log(respObj);
                
            if(respObj.status==="Success"){
                setEmail(e.target.email.value);
                setFullName(e.target.fullName.value)
                setIsOtpSent(true);
            }else{
                alert(respObj.message);
            }
        } catch (error) {
            console.log("Error sending OTP:", error);
        }
    };

    return (
        <div><br/>
            {isOtpSent ? (
                <form onSubmit={handleRegister}>
                    <input type="text" value={email} readOnly />
                    <input type="text" value={fullName} readOnly />
                    <input type="text" placeholder="OTP" name="otp" required />
                    <input type="password" placeholder="Password" name="password" required />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" required />
                    <button type="submit">Register</button>
                </form>
            ) : (
                <form onSubmit={handleSendOtp}>
                    <input type="text" placeholder="Full Name" name="fullName" required />
                    <input type="email" placeholder="Email" name="email" required />
                    <button type="submit">Send OTP</button>
                </form>
            )}
        </div>
    );
};

export default SignUpPage;
