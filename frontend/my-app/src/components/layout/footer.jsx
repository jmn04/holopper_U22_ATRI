/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const copyRihgt = css`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Footer = () =>{
    return(
        <div css={copyRihgt}>
            <p>ATRI inc.</p>
        </div>
    )
}