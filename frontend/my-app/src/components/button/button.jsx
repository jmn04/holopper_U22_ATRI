/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const button = css`
display: block;
text-align: center;
vertical-align: middle;
text-decoration: none;
width: 120px;
margin: auto;
padding: 1rem 4rem;
font-weight: bold;
border: 2px solid #27acd9;
background: #27acd9;
color: #fff;
&:hover {
	color: #27acd9;
	background: #fff;
}
`

export const Button = (props) =>{
    return(
        <Link to={props.path}  state={{ state: props.send_data }}>
            <div css={button}>
                <p>{props.text}</p>
            </div>
        </Link>
    )
}
