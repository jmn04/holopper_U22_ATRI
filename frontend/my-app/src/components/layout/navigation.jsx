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
border-right: 2px solid #000000;
box-sizing: border-box;
`;

const navigationTop = css`
border-bottom: solid 2px #000000;
height: 10vh;
display: flex;
justify-content: center;
align-items: center;
h1 {
    font-size: 1.4rem;
    font-weight: 600;
}`;

const navigationBox = css`
border-bottom: solid 2px #000000;
height: 10vh;
display: flex;
justify-content: center;
align-items: center;
transition: background-color 0.2s;
`;

const navigationBoxText = css`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
    a,button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 1.6rem;
        text-decoration: none;
        color: inherit;
    }
    &:hover {
        background-color: #cbcbcb;
        transition: ;
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
                <Link to="/projection">投影</Link>
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
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            )
        }
        <div css={tabFooter}>
            <p><img src={icon} alt="icon" /></p>
        </div>
    </div>
    )

}