from flask import Flask, Response, jsonify, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
import csv
from camera import main
import global_value as glb
import os 
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app,logger=True, engineio_logger=True, cors_allowed_origins="*")
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app)


@socketio.on("ping")  # pingイベントが届いたら呼ばれるコールバック
def ping(data):
    print(data)

@app.route('/')
def index():
    return jsonify({"result": "aaaa"})

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')    

@socketio.on('run-script')
def handle_run_script():
    script_gen = main()
    for data in script_gen:
        socketio.emit('response', data)
        socketio.sleep(0.1)  

@app.route('/get-data', methods=['GET', 'POST'])
def get_data(): 
    join_room('room1') 
    str_command = ""
    last_row = None
    with open('./share.csv', 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            last_row = row
    str_command = [str(i) for i in last_row]
    return jsonify({'data': str_command})

@app.route('/end-script', methods=['GET', 'POST'])
def end_camera():
    if glb.cap is not None:
        glb.cap.release()  # カメラを解放する
        glb.cap = None
    return jsonify({'data': "end"})

if __name__ == '__main__':
    socketio.run(app,allow_unsafe_werkzeug=True,host='127.0.0.1',port=5000)
