# U-22 holopper

<img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/PHP-ccc.svg?logo=php&style=flat">
<img src="https://img.shields.io/badge/-Python-F9DC3E.svg?logo=python&style=flat">
<img src="https://img.shields.io/badge/-MySQL-aaaaaa.svg?logo=mysql&style=flat">
<img src="https://img.shields.io/badge/-Docker-EEE.svg?logo=docker&style=flat">

U-22プログラミングコンテストに向けて作成したものです。\
Webアプリをすぐに構築できるよう、Dockerを使用しています。

## バージョン情報
<img src="https://img.shields.io/badge/Node-v14-b2b2b2.svg?logo=node.js&style=flat">
<img src="https://img.shields.io/badge/PHP-v7.4-b2b2b2.svg?logo=php&style=flat">
<img src="https://img.shields.io/badge/Python-v3.10-b2b2b2.svg?logo=python&style=flat">
<img src="https://img.shields.io/badge/MySQL-v8.0-b2b2b2.svg?logo=mysql&style=flat">
<br>
<br>

# 実行手順
## ■ IPアドレスの設定
アプリケーションフォルダを開き、frontend/my-app/.envの\
`REACT_APP_IP_ADDRESS = {IP_ADDRESS}`をお使いの端末のIPv4アドレスに書き換えてください。\
IPアドレスは`ipconfig`コマンドで確認可能です。\
それ以外の変更は不要です。

## ■ コンテナの構築
Docker Desktopを起動後、
docker-compose.ymlが存在するディレクトリで、\
`docker-compose up --build`\
を実行してください。

## ■ ログインページへのアクセス
コンテナ起動後、コマンドプロンプトに
`react-frontend  | Starting the development server...`\
と表示されたらWebブラウザを開き、\
"http://localhost:3000/login"にアクセスしてください。

## ■ ログインする
>Mail Address：test@test.com\
>password：password

## ■ コンテナの停止・削除
`docker-compose down`\
を実行してください。
