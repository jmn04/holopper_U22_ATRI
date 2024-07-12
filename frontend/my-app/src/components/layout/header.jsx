/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { Link } from "react-router-dom";

const header = css`
    // display: flex;
    // justify-content: right;
    // align-items: center;
    // width: 90vw;
    // height: 10vh;
    // background-color: #0081ca;
    // border-bottom: #b6d6e4 solid 2px;

    display: flex;
    justify-content: right;
    align-items: center;
    position: fixed;
    top: 0;
    background-color: #0081CA;
    width: 90vw;
    margin-left: 10vw;
    height: 10vh;
    border-bottom: #b6d6e4 solid 2px;
`;

const headerUser = css`
    text-align: center;
    min-width: 12vw;
    // height: 4vh;
    padding: 1% 1%;
    margin: auto 2%;
    background-color: #006aa5;
    border-bottom: 1px #003e60;
    p{
    text-overflow: ellopse;
    overflow: hidden;
    white-space: nowrap;
    color: #ffffff;
    }
`

export const Header = () => {
    const { isLoggedIn, userName } = useContext(AuthContext);
    return(
        <div css={header}>
            <div css={headerUser}>
            {isLoggedIn ? (
                <p>{userName}</p>
            ) : (
                <Link to="./login">ログインする</Link>
            )}
            </div>
        </div>
    )
}