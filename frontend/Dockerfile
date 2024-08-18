# ベースイメージとしてNode.jsを使用
FROM node:14

# アプリケーションディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

RUN apt-get update && apt-get upgrade -y

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# サーバーを起動
CMD ["npm", "start"]

# ポート3000を公開
EXPOSE 3000
