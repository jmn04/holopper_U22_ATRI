/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const copyRihgt = css`
    margin-top: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
`

export const Footer = () =>{
    return(
        <div css={copyRihgt}>
            <p>ATRI inc.</p>
        </div>
    )
}