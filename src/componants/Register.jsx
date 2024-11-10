import React, { useState } from "react";
import Messages from "./Messages";
import "../Register.css";

function Register({ setPlayers, type, ChangePage, alertMessage }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function signUpFunction(event) {
        event.preventDefault();
        if (localStorage.getItem(userName)) {
            alertMessage("user name already exists", "alert");
        }
        else {
            localStorage.setItem(userName, JSON.stringify({ email: email, password: password, scoreArray: [] }));
            setPlayers(prevPlayers => [...prevPlayers, userName]);
            alertMessage("successfuly added to the game!", "successfulSignUp");
        }
    }
    function loginFunction(event) {
        event.preventDefault();
        if (localStorage.getItem(userName)) {
            let user = JSON.parse(localStorage.getItem(userName));
            if (user.password == password) {
                setPlayers(prevPlayers => [...prevPlayers, userName]);
                alertMessage("successfuly added to the game!", "successfulSignUp");
            }
        }
    }

    return (
        <>
            <form className="register-form" onSubmit={(type == "signup") ? signUpFunction : loginFunction}>
                <input
                    className="user-name"
                    name="userName"
                    placeholder="User name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                {type == "signup" && (
                    <input
                        className="user-email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    value="Sign Up"
                />
                {type == "signup" && <button className="register-button" onClick={() => ChangePage("login")}>already have an account? login</button>}
                {type == "login" && <button className="register-button" onClick={() => ChangePage("signup")}>don't have an account? signUp</button>}
            </form>
        </>
    );
}

export default Register;

