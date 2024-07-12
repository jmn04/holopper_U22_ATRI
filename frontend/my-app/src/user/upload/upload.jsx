/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import React, { useState,useContext } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from '../../AuthContext';
import { styled } from '@mui/material/styles';

export const FileUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [glbFile, setGlbFile] = useState(null);
    const [error, setError] = useState('');
    const { isLoggedIn, logout, userID } = useContext(AuthContext);
  
    const handleThumbnailChange = (event) => {
      setThumbnailFile(event.target.files[0]);
    };
  
    const handleGlbChange = (event) => {
      setGlbFile(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setError('');
      if (!thumbnailFile || !glbFile) {
        alert('サムネイル画像とGLBファイルの両方を選択してください。');
        return;
      }
  
      const formData = new FormData();
      formData.append('user_id',userID)
      formData.append('title', title);
      formData.append('description', description);
      formData.append('thumbnail', thumbnailFile);
      formData.append('glb', glbFile);
  
      // FormDataの内容をログに出力
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      try {
        const response = await fetch('http://localhost/api/addModel/', {
          method: 'POST',
          body: formData,
        });

        const text = await response.text(); // レスポンスをテキストとして取得
      console.log('レスポンステキスト:', text);

      const data = JSON.parse(text);
  
        if (!response.ok) {
            setError(data.message || 'Login failed');
        }else{
            console.log('アップロード成功', data);

        }
      } catch (error) {
        console.error('アップロード失敗', error);
      }
    };


 /*  const handleJpegUpload = async () => {
    if (!jpegFile) {
      alert("JPEGファイルを選択してください");
      return;
    }

    const formData = new FormData();
    formData.append('file', jpegFile);

    try {
        const response = await fetch('http://localhost/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData,
        });
      console.log('JPEGアップロード成功', response.data);
    } catch (error) {
      console.error('JPEGアップロード失敗', error);
    }
  };

  const handleGlbUpload = async () => {
    if (!glbFile) {
      alert("GLBファイルを選択してください");
      return;
    }

    const formData = new FormData();
    formData.append('file', glbFile);

    try {
        const response = await fetch('http://localhost/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData,
        });
      console.log('GLBアップロード成功', response.data);
    } catch (error) {
      console.error('GLBアップロード失敗', error);
    }
  }; */

  return (
      <div css={contentWrapper}>
        <div css={contentTitle}>
          {/* タイトル */}
          <h2>モデル登録</h2>
        </div>
      <div css={contentStyle}>
        <form onSubmit={handleSubmit} css={formStyle}>
          <div css={fileBox}>
            {/* <input type="file" accept=".jpeg,.jpg,.png" onChange={handleThumbnailChange} />
            <button>JPEGアップロード</button> */}
            <CustomButton
              component="label"
              // style={fileUpButton}
              onChange={handleThumbnailChange}
            >
              モデル画像アップロード（JPEG）
              <input
                type="file"
                accept=".jpeg,.jpg,.png"
                css={fileUpMain}
              />
            </CustomButton>
          </div>
          <div css={fileBox}>
            {/* <input type="file" accept=".glb" onChange={handleGlbChange} />
            <button>GLBアップロード</button> */}
            <CustomButton
              component="label"
              onChange={handleGlbChange}
            >
              3Dモデルアップロード（GLB）
              <input
                type="file"
                accept=".glb"
                css={fileUpMain}
              />
            </CustomButton>
          </div>
          <div css={inputTextBox}>
          <div>
            {/* <label>タイトル</label>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            css={textFieldStyle}/> */}
            {/* タイトル入力 */}
            <TextField type="text" value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="タイトル"  
            // variant="outlined"
            size="normal" 
            multiline
            required
            css={textFieldStyle} />
          </div>
          <div>
            {/* <label>説明文</label>
            <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required 
            css={textFieldStyle}/> */}
            {/* 説明文入力 */}
            <TextField type="text" value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="説明文"  
            // variant="outlined"
            size="big" 
            multiline
            required
            css={textFieldStyle} />
          </div>

          </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {/* <button type="submit">登録</button> */}
            {/* 登録ボタン */}
            <Button type="submit" variant="contained"
            color="primary" css={buttonStyle}>登録</Button>
        </form>
      </div>
    </div>
  );
};

const contentWrapper = css`
  display: flex;    
  flex-direction: column;
  height: 100%;
  // margin: 5%;
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
const contentStyle = css({
  margin: '1rem 3vw',
  overflowY: 'scroll',
})

const fileUpMain = css`
  opacity:0;
  appearance: none;
  position: absolute;
`;

// スタイル設定
const mgBottom = "4.2rem";

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

// fileボタンのスタイル
const fileBox = css({
  margin: '1% 0',
});

const CustomButton = styled(Button)({
  border: '1px solid #0055f2', // 枠線のスタイル
  textTransform: 'none', // テキストの大文字化を防ぐ
  color: '#0000EE', // テキストの色をリンク色に
  backgroundColor: 'transparent', // 背景色を透明に
  boxShadow: 'none', // 影を削除
  fontSize: '1.2rem',
  width: '70%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: '#f2f2f2', // ホバー時の背景色をグレーに
    textDecoration: 'underline', // ホバー時の下線を追加
  },
});

// テキストフィールドのスタイル
const textFieldStyle = css({
    width: '50%',
    marginBottom: mgBottom,
    fontSize: '150%',
    textAlign: 'left',
});

const inputTextBox = css({
  marginTop:'3%'
})

// 登録ボタンのスタイル
const buttonStyle = css({
  padding: '1.2rem',
  width: '20%',
  textAlign: 'center',
  fontSize: '1.2rem',
});

