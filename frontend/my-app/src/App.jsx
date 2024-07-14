import React, { Component, useContext, useEffect } from 'react';
import { useNavigate,useLocation,BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './destyle.css';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Home } from './user/home/Home.jsx';
import { Model } from './user/model/Model.jsx';
import { ModelDetail } from './user/modelDetail/modelDetail.jsx';
import Settings from './user/settings/SettingsPage.jsx';
import { Login } from './user/login/login.jsx';
/* import { Header } from './components/layout/header.jsx'; */
import { Navigation } from './components/layout/navigation.jsx';
import { Footer } from './components/layout/footer.jsx';
import { AuthContext } from './AuthContext';
import { FileUpload } from './user/upload/upload.jsx';
import { Show } from './user/show/show.jsx'
import { Register } from './user/createUser/register.jsx';


const box = css`
  display: flex;
  width: 100%;
  height: 100vh;
`

const main = css`
  overflow: hidden;
  flex: 1;
`;

const mainWrapper = css`
width: 100%;
height: 90%;
padding: 2.5%;
margin-top: 5vh;
`

const mainContent = css`
height: 100%;
padding: 1rem;
> div{
  height: 100%
}
`
const title = css`
  font-size: 1.8rem;
`

const header = css`
grid-row: 1 / 2;
grid-column: 2 / 3;
`

const navigation = css`
width: 20%;
max-width: 200px;
`

const footer = css`
width: 100%;
height: 5%;
`

const contentBox = css`
height: 100%;
`


function App() {
  const { userID } = useContext(AuthContext);
  console.log(userID)
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    if (userID == null && pathname != '/register') {
      navigate('/login');
    }
  }, [userID,location.pathname]);
  /* const { userID } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userID) {
      return navigate('/login');
    }
  }, [userID]);

  if (!userID) {
    return null; // ユーザーがログインしていない場合、何もレンダリングしない
  } */
  return (
          <div css={box}>{/* 
            <div css={header}>
              <Header userName={"テスト"}></Header>
            </div> */}
            <div css={navigation}>
              <Navigation></Navigation>
            </div>
            <div css={main}>
              <div css={mainWrapper}>
                <div css={mainContent}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/model" element={<Model />} />
                    <Route path="/model/:model_id" element={<ModelDetail />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/show/:model_id" element={<Show />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/upload" element={<FileUpload />} />
                  </Routes>
                </div>
              </div>
              <div css={footer}>
                <Footer></Footer>
              </div>
            </div>
          </div>
  );
}

export default App;