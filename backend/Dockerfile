# ベースイメージとしてPHP Apacheを使用
FROM php:7.4-apache

# Apacheのドキュメントルートにコードをコピー
COPY . /var/www/html/api

# 必要なPHP拡張モジュールをインストール
RUN apt-get update && apt-get install -y \
    libonig-dev \
  && docker-php-ext-install pdo_mysql mysqli mbstring

# ポート80を公開
EXPOSE 80
