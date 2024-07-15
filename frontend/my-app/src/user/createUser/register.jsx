/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useState, useContext, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { isLoggedIn,login } = useContext(AuthContext);
    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate();

    // エラーメッセージのフェードアウト処理
    useEffect(() => {
        if (error) {
            const timer1 = setTimeout(() => {
                setIsFading(true);
            }, 4000); // 4秒後にフェードアウトを開始
            const timer2 = setTimeout(() => {
                setError('');
                setIsFading(false);
            }, 5000); // 5秒後にエラーメッセージをクリア

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`http://${process.env.REACT_APP_IP_ADRESS}:${process.env.REACT_APP_BACKEND_PORT}/api/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, mail: mail, password: password }),
            });
            const data = await response.json();
            if (response.ok && data.is_register) {
                navigate('/login');
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
            <div>
                {/* フラッシュメッセージ */}
                {error && <Alert severity="error"
                css={css({animation: isFading ? `${fadeOut} 1s forwards` : 'none'})}>メールアドレスまたはパスワードに誤りがあります。</Alert>}
                {/* タイトル */}
                <h2 css={titleStyle}>アカウント登録</h2>
                {/* 入力フォーム */}
                <form onSubmit={handleSubmit} css={formStyle}>
                    <div>
                        {/* ユーザー名入力 */}
                        <TextField type="text" value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="User Name"  variant="outlined" required
                        css={textFieldStyle} />
                    </div>
                    <div>
                        {/* パスワード入力 */}
                        <TextField type="text" value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        label="mail" variant="outlined" required
                        css={textFieldStyle} />
                    </div>
                    <div>
                        {/* パスワード入力 */}
                        <TextField type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password" variant="outlined" required
                        css={textFieldStyle} />
                    </div>
                        {/* ログインボタン */}
                        <Button type="submit" variant="contained"
                        color="primary" css={buttonStyle}>送信</Button>
                </form>
                <div css={textStyle}>
                    <Link to="/login">ユーザー登録がお済みの方はこちら</Link>
                </div>
            </div>
        )}
        </div>
    );
};

// スタイル設定
const mgBottom = "4.2rem";
const textStyle = css({
    textAlign: 'center',
    marginTop: '1.4rem',
    '&:hover': {
        textDecoration: 'underline'
    }
});


const fadeOut = keyframes({
    from: { opacity: 1 },
    to: { opacity: 0 },
});

const titleStyle = css({
    fontSize: '2.4rem',
    // fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '4rem',
    marginBottom: mgBottom,
});

const formStyle = css({
    textAlign: 'center',
    // display: 'flex',
    flexDirection: 'column',
});

const textFieldStyle = css({
    width: '50%',
    marginBottom: mgBottom,
    fontSize: '150%',
    textAlign: 'left',
});

const buttonStyle = css({
    padding: '1.2rem',
    width: '20%',
    textAlign: 'center',
});