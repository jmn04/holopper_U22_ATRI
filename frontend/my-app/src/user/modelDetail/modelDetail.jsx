/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams  } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { Button } from "../../components/button/button"

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
  font-size: 1.4rem;
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
  font-size: 2rem;
`

const modelWrapper = css`
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 2rem;
`

const modelContainer = css`
    width: 100%;
    position: relative;
`

const img = css`
    width: 50%;
    height: 100%;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const text = css`
background: black;
padding: 0.5rem;
width: 100%;
color: white;
h3,p{
  margin: 0.25rem;
}
h3{
  font-size: 1.6rem;
}
`

const contentBox = css`
display:flex;
`

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
}`

export const ModelDetail = () => {
  
  const [jsonCode, setJsonCode] =useState();
  const { userID } = useContext(AuthContext);
  const { model_id } = useParams();
  console.log(model_id)
  useEffect(() => {
    if (!userID) {
      console.log('userIDが見つかりません');
      return;
    }
    console.log('データ取得開始。userID:', userID);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userID, model_id: model_id })
    };

    fetch("http://localhost/api/model/", options)
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
      .catch((error) => console.log("Fetchエラー:", error));
  }, [userID]);

  
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
                <div css={contentBox}>
                    <div css={img}>
                        <img src={"http://localhost/api/assets/img/"+item.img_file_name} alt="" />
                    </div>
                    <div css={text}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>{item.updated_date}</p>
                        
                        {/* <Link to={"/show/"+model_id} state={{ state: item.model_file_name } }>
                            <div css={button}>
                                <p>投影</p>
                            </div>
                        </Link> */}
                        <Button path={"/show/"+model_id} text="投影" send_data={item.model_file_name}></Button>
                    </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

