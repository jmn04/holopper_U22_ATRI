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
import { Header } from './components/layout/header.jsx';
import { Navigation } from './components/layout/navigation.jsx';
import { Footer } from './components/layout/footer.jsx';
import { AuthContext } from './AuthContext';
import { FileUpload } from './user/upload/upload.jsx';
import { Show } from './user/show/show.jsx'


const box = css`

`

const main = css`
  height: 90vh
  margin-top :10vh;
  margin-left: 10vw;
`;

const mainWrapper = css`
  // overflow: hidden;
  margin: 14vh 4vw 0;
`

const mainContent = css`
  border: solid 1px #000000;
  width: 80vw;
  height: 100%;
  margin 10vw;
  // padding: 1rem;
  > div{
    height: 80vh
  }
`
const title = css`
  font-size: 1.8rem;
`

const header = css`
`

const navigation = css`
`

const footer = css`
margin-left: 10vw;
`

const contentTitle = css`
  // width: 100%;
  // max-width: auto;
  margin: 1%;
  border-bottom: solid 2px #000000;
  h2{
    font-size: 2.4rem;
    font-weight: 600;
    padding: 0.4rem 0.2rem;
  }
`;

function App() {
  const { userID } = useContext(AuthContext);
  console.log(userID)
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (userID == null) {
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
          <div css={box}>
            <div css={header}>
              <Header userName={"テスト"}></Header>
            </div>
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
                    <Route path="/show/:model_id" element={<Show />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/upload" element={<FileUpload />} />
                  </Routes>
                </div>
              </div>
            </div>
            <div css={footer}>
              <Footer></Footer>
            </div>
          </div>
  );
}

export default App;