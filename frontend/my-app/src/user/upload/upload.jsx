import React, { useState,useContext } from 'react';
import { AuthContext } from '../../AuthContext';

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
    <div>
        <form onSubmit={handleSubmit}>
            <div>
              <input type="file" accept=".jpeg,.jpg,.png" onChange={handleThumbnailChange} />
              <button>JPEGアップロード</button>
            </div>
            <div>
              <input type="file" accept=".glb" onChange={handleGlbChange} />
              <button>GLBアップロード</button>
            </div>
            <div>
                <label>タイトル</label>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required/>
            </div>
            <div>
                <label>説明文</label>
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required />
            </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Login</button>
        </form>
    </div>
  );
};

