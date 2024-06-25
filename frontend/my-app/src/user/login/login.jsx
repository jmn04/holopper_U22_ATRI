/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { isLoggedIn,login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mail: username, password: password }),
            });
            console.log("aaa")
            const data = await response.json();
            console.log(data)
            if (response.ok && data.is_login) {
                login(data); 
                localStorage.setItem('user', JSON.stringify(data)); 
                // ログイン成功時の処理
                console.log('Login successful', data);
            } else {
                // ログイン失敗時のエラーメッセージを設定
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
        {isLoggedIn ? (
            <Navigate to="/" />
        ) : (
            <>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    </div>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <button type="submit">Login</button>
                </form>
            </>
        )}
        </div>
    );
};
