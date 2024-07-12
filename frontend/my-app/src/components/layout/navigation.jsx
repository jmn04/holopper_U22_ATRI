/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import icon from '../../assets/images/icon.png';
import { AuthContext } from '../../AuthContext';


const navigation = css`
height: 100%;
background-color: #ffffff;
width: 100%;
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`;

const navigationWrapper = css`
height: 100%;
width: 100%;
`

const navigationTop = css`
height: 10vh;
display: flex;
justify-content: start;
align-items: center;
background-color: #0081ca;
padding: 0 1rem;
h1 {
    padding: 0 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: white;
}`;

const navigationBox = css`
height: 10vh;
display: flex;
justify-content: center;
align-items: center;
transition: background-color 0.2s;
padding: 0 1rem;
`;

const navigationBoxText = css`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
border-bottom: solid 1.5px #d1d1d1;
    a,button {
        padding: 0 1rem;
        display: flex;
        justify-content: start;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 1.2rem;
        text-decoration: none;
        color: inherit;
        font-weight: bold;
    }
    &:hover {
        color: #0081ca;
        border-bottom: solid 1.5px #0081ca;
    }
`;

const tabFooter = css`
height: 28vh;
border-bottom: #000000 solid 1px;
margin-bottom: calc(2vh - 1px);
display: flex;
flex-direction: row;
align-items: flex-end;
p {
    margin: 5% 5%;
    img {
        max-width: 100%;
        max-height: 100%;
    }
}
`;



export const Navigation = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    return(  
    <div css={navigation}>
        <div css={navigationWrapper}>
            <div css={navigationTop}>
                <div className="tab-text">
                    <h1>メニュー</h1>
                </div>
            </div>
            <div css={navigationBox}>
                <div css={navigationBoxText}>
                    <Link to="/">ホーム</Link>
                </div>
            </div>
            <div css={navigationBox}>
                <div css={navigationBoxText}>
                    <Link to="/model">3Dモデル</Link>
                </div>
            </div>
            <div css={navigationBox}>
                <div css={navigationBoxText}>
                    <Link to="/settings">設定</Link>
                </div>
            </div>
            <div css={navigationBox}>
                <div css={navigationBoxText}>
                    <Link to="/upload">モデル登録</Link>
                </div>
            </div>
            {
                isLoggedIn && (
                    <div css={navigationBox}>
                        <div css={navigationBoxText}>
                            <Link to="/mypage">マイページ</Link>
                        </div>
                    </div>
                )
            }
            {
                isLoggedIn && (
                    <div css={navigationBox}>
                        <div css={navigationBoxText}>
                            <button onClick={logout}>ログアウトする</button>
                        </div>
                    </div>
                )
            }
        </div>
        <div css={tabFooter}>
            <p><img src={icon} alt="icon" /></p>
        </div>
    </div>
    )

}