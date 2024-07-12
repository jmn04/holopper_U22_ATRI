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
  margin: 1%;
  border-bottom: solid 2px #000000;
  h2{
    font-size: 2.4rem;
    font-weight: 600;
    padding: 0.4rem 0.2rem;
  }
`;

const contentBlock = css`
  margin: 1rem 3vw;
  overflow-y: scroll;
  // flex: 1;
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
  // background: black;
  padding: 0.5rem;
  width: 100%;
  margin: 2%;
  // color: white;
  h3,p{
    margin: 0.25rem;
  }
  h3{
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #000000;
  }
  p{
    font-size: 1.4rem;
    // padding-left: 1rem;
  }
  max-height: 100%;
`

const contentBox = css`
  display:flex;
  border: solid 1px #000000;
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
  }
  font-size: 1.2rem
  margin: 0.5rem
`

const buttonBox1 = css`
  margin-top:10%;
`
const buttonBox2 = css`
  margin-top:3%;
  div{
      border: 1px solid #27acd9;
      background: #ffffff;
    p{
      color: #000000;
      font-weight: 300;
    }&:hover{
      background: #e9e9e9;
      font-weight: 600;
    }
  }
`

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

    fetch(`http://${process.env.REACT_APP_IP_ADRESS}:${process.env.REACT_APP_BACKEND_PORT}/api/model/`, options)
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
                        <img src={`http://${process.env.REACT_APP_IP_ADRESS}:${process.env.REACT_APP_BACKEND_PORT}/api/assets/img/`+item.img_file_name} alt="" />
                    </div>
                    <div css={text}>
                        <h3>モデル名：{item.title}</h3>
                        <p>説明：{item.description}</p>
                        <p>登録日：{item.updated_date}</p>
                        
                        {/* <Link to={"/show/"+model_id} state={{ state: item.model_file_name } }>
                            <div css={button}>
                                <p>投影</p>
                            </div>
                        </Link> */}
                        <div css={buttonBox1}>
                        <Button path={"/show/"+model_id} text="投影" send_data={item.model_file_name}></Button>
                        </div>
                        <div css={buttonBox2}>
                        <Button path={"/model"} text="戻る" send_data={item.model_file_name}></Button>
                        </div>
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

