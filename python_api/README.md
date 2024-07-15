# 必要パッケージのインストール
足りないものがあったら教えてください。
```
Flask: pip install Flask
Flask-CORS: pip install flask-cors
Flask-SocketIO: pip install flask-socketio
python-dotenv: pip install python-dotenv
OpenCV (cv2): pip install opencv-python
mediapipe: pip install mediapipe
NumPy: pip install numpy
pandas: pip install pandas
```
```
pip install Flask flask-cors flask-socketio python-dotenv opencv-python mediapipe numpy pandas
```

### test.py 
flaskのルーティングを行っているファイル  
SocketIOを使って通信。  
@app.route('/get-data', methods=['GET', 'POST'])にアクセスが来るとcamera.pyのmain()を動かしカメラ起動しています。
```
script_gen = main()
for data in script_gen:
  socketio.emit('response', data)
```
でデータを返しています。
中身はcamera.pyで実行されているWhile文の中のyield camera.send_commandで、  
connect_cammera.pyのConnectCameraクラスのsend_command変数を返しています。


### 流れ

フロントからhttp://localhost(ip address):5000/run-scriptにアクセス  
↓  
camera.pyのメイン関数を実行し、カメラ起動  
↓  
カメラが起動したらwhile文に突入(camera.py)  
↓  
指のポーズ判定（new_finger.py)  
↓  
判定したポーズを配列に格納（finger_array.py)  
↓  
配列のラスト10個が同じなら送信するコマンドに設定(connect_camera.py)  
↓  
設定したコマンドをyield camera.send_commandで返す(camera.py)  
↓  
while文なのでずっとコマンドを返す  
↓  
フロント側でコマンドを受け取り、コマンドに合わせて動作を実行（現在は回転のみ）  
↓  
モデル表示ページから離れると/end-scriptにアクセスし、カメラをクローズする  


## 各ファイル解説
### camera.py
カメラを起動し、様々な処理を実行させるメインファイル

### connect_camera.py
主に送信するコマンドを設定するファイル

### finger_array.py
主に判定したポーズを配列に格納し、どのコマンドを送信するか判定するファイル

### global.value.py
グローバル変数用

### new_finger
ポーズ判定用

### reset.py
コマンドとかのリセット用

### send_data.py
csvに書き込み用、使ってないかも

継ぎ足し継ぎ足しの違法建築なので、かなり雑な作りです。ごめんなさい。
