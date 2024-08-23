# U-22 holopper

<img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=flat">&nbsp;<img src="https://img.shields.io/badge/PHP-ccc.svg?logo=php&style=flat">&nbsp;<img src="https://img.shields.io/badge/-Python-F9DC3E.svg?logo=python&style=flat">&nbsp;<img src="https://img.shields.io/badge/-MySQL-aaaaaa.svg?logo=mysql&style=flat">&nbsp;<img src="https://img.shields.io/badge/-Docker-EEE.svg?logo=docker&style=flat">

U-22プログラミングコンテストに向けて作成したものです。\
Webアプリをすぐに構築できるよう、Dockerを使用しています。

## バージョン情報
<img src="https://img.shields.io/badge/Node-v14.0-b2b2b2.svg?logo=node.js&style=flat">&nbsp;<img src="https://img.shields.io/badge/PHP-v7.4-b2b2b2.svg?logo=php&style=flat">&nbsp;<img src="https://img.shields.io/badge/Python-v3.10-b2b2b2.svg?logo=python&style=flat">&nbsp;<img src="https://img.shields.io/badge/MySQL-v8.0-b2b2b2.svg?logo=mysql&style=flat">
<br>
<br>

# 実行手順
## ■ 仮想環境の構築
※あらかじめanacondaをインストールしていること、パスが通っていることを確認してください。\
コマンドプロンプトを起動し、python_apiがカレントディレクトリとなるようにしてください。\
次に、`conda create -n python_api python=3.9.18`を実行し、`conda activate python_api`を実行。\
そして、`pip install -r pip_requirements.txt`を実行。\
さらに、 `conda install --file conda_requirements.txt`を実行。\
これで仮想環境の構築は完了です。
 
## ■ python_apiの実行
仮想環境の構築の続きであることを前提に説明します。\
`python test.py`を実行してください。\
以後使用するコマンドプロンプトは新しいウィンドウまたはタブにて実行してください。

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
と表示されたらWebブラウザを開き、http://localhost:3000/login

## ■ ログインする
>Mail Address：test@test.com\
>password：password

## ■ Python APIの起動
Docker起動中のコマンドプロンプトとは別にウィンドウを開き、\
`cd python_api`\
`python test.py`\
を実行してください。

## ■ コンテナの停止・削除
`docker-compose down`\
を実行してください。
