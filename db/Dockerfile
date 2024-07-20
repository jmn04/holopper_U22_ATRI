# ベースイメージとしてMySQLを使用
FROM mysql:8.0

# 環境変数を設定
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=holopper
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
ENV LANG ja_JP.UTF-8

CMD ["mysqld", "--character-set-server=utf8", "--collation-server=utf8_unicode_ci"]

# ポート3306を公開
EXPOSE 3306
