import React, { useState } from "react";
import "../styles/Register.css";

function Register({ setPlayers, type, ChangePage, alertMessage }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function resetForm() {
        setUserName("");
        setEmail("");
        setPassword("");
    }
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function signUpFunction(event) {
        event.preventDefault();
        if (localStorage.getItem(userName)) {
            alertMessage("User name already exists", "alert");
        } else if (!validateEmail(email)) {
            alertMessage("Invalid email format. Must include '@'", "alert");
        } else if (password.length < 6) {
            alertMessage("Password must be at least 6 characters long", "alert");
        } else {
            localStorage.setItem(userName, JSON.stringify({ email: email, password: password, scoreArray: [] }));
            setPlayers(prevPlayers => [...prevPlayers, { name: userName, id: Date.now() }]);
            alertMessage("Successfully added to the game!", "successfulSignUp");
            resetForm();
        }
        resetForm();
    }
    function loginFunction(event) {
        event.preventDefault();
        if (localStorage.getItem(userName)) {
            let user = JSON.parse(localStorage.getItem(userName));
            if (user.password === password) {
                setPlayers(prevPlayers => [...prevPlayers, { name: userName, id: Date.now() }]);
                alertMessage("Successfully logged in!", "successfulSignUp");
                resetForm();
            } else
                alertMessage("Incorrect password", "alert");
        } else
            alertMessage("User does not exist", "alert");
    }
    return (
        <>
            <form className="register-form" onSubmit={(type === "signup") ? signUpFunction : loginFunction}>
                <input
                    className="user-name"
                    name="userName"
                    placeholder="User name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                {type === "signup" && (
                    <input
                        className="user-email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                )}
                <input
                    className="user-password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                />
                <input
                    className="register-input"
                    type="submit"
                    value={type === "signup" ? "Sign Up" : "Log In"}
                />
                {type === "signup" && (
                    <button className="register-button" onClick={() => ChangePage("login")}>
                        Already have an account? Log in
                    </button>
                )}
                {type === "login" && (
                    <button className="register-button" onClick={() => ChangePage("signup")}>
                        Don't have an account? Sign up
                    </button>
                )}
            </form>
        </>
    );
}

export default Register;