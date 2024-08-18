/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useContext, useParams } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const contentWrapper = css`
display: flex;    
flex-direction: column;
height: 100%;
`

const contentTitle = css`
width: 100%;
margin: 1rem 0;
h2{
  border-bottom: solid 2px #000000;
  font-size: 2.2rem;
  font-weight: 600;
  padding: 0.4rem 0.2rem;
}
`;

const contentBlock = css`
margin: 1rem;
overflow-y: scroll;
flex: 1;
`;

const title = css`
  font-size: 1.8rem;
`

const modelWrapper = css`
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 2rem;
`

const modelContainer = css`
  width: calc( (88% - 2rem * 2) / 3 );
  margin: 2%;
  aspect-ratio: 1 / 1;
  position: relative;
  border: solid 1px #000000;
`

const text = css`
  position: absolute;
  bottom: 0;
  left: 0;
  background: black;
  padding: 0.5rem;
  width: 100%;
  color: white;
  opacity: 0.9;
  h3,p{
    margin: 0.25rem;
  }
  h3{
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }
`

const img = css`
    width: 100%;
    height: 100%;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

export const Model = () => {
  
  const [jsonCode, setJsonCode] =useState();
  const { userID } = useContext(AuthContext);
  useEffect(() => {
    if (!userID) {
      console.log('userIDが見つかりません');
      return;
    }
    console.log('データ取得開始。userID:', userID);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userID})
    };
    console.log("error")

    fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_BACKEND_PORT}/api/model/`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('ネットワーク応答が正常ではありません');
        }
        return res.json();
      })
      .then((json) => {
        console.log('データ取得成功:', json);
        setJsonCode(json);
      })
      .catch((error) => console.log("Fetchエラー:", error))
      
    /* fetch("http://localhost:5000/end-script")
    .then((res) => {
      if (!res.ok) {
        throw new Error('ネットワーク応答が正常ではありません');
      }
      return res.json();
    }); */
  }, []);

  
  return (
    <div css={contentWrapper}>
      <div css={contentTitle}>
        <h2>登録モデル</h2>
      </div>
      <div css={contentBlock}>
        <div>
          <h2 css={ title }>モデル一覧</h2>
        </div>
        <div css={modelWrapper}>
          {
            jsonCode && jsonCode["model_data"].map((item, index) => (
              <div key={index} css={modelContainer}>
                <Link to={"/model/"+item.model_id}>
                <div css={img}>
                  <img src={`http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_BACKEND_PORT}/api/assets/img/`+item.img_file_name} alt="" />
                </div>
                <div css={text}>
                  <h3>{item.title}</h3>
                  {/* <p>{item.description}</p> */}
                  <p>{item.updated_date}</p>
                </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

