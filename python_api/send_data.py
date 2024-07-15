import mmap
import os
import csv
#メモリマップファイルで送る関係のクラス
class Send_data:
    
    def __init__(self,camera):
        self.camera = camera
        
    def send_data_command(self,send_command):
        yield send_command
    
    def create(self,filename):
        file_exists = os.path.exists(filename)
        if not file_exists:
            with open(filename,'w',newline='') as csv_file:
                writer = csv.DictWriter(csv_file, fieldnames=self.camera.fieldnames)
                writer.writeheader()
        
    def send_csv_data(self,data):
        with open(self.camera.filename, 'r+b') as file:
            mmapped_file = mmap.mmap(file.fileno(), 0, access=mmap.ACCESS_WRITE)
            mmapped_file[:len(data)] = data
            mmapped_file.flush()
            
    def connect_memory(self):
        try:
            with open(self.camera.filename, 'a', newline='') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=self.camera.fieldnames)
                writer.writerow({
                    'command': self.camera.send_command
                })
            with open(self.camera.filename, 'r') as csvfile:
                csvfile.seek(self.camera.last_position)  # 前回の終了位置から読み取り
                csv_data = csvfile.read()
                # CSVデータが変更された場合のみ送信
                if csv_data:
                    # CSVデータをメモリマップファイルに送信
                    self.send_csv_data(csv_data.encode())
                    # 今回の終了位置を記録
                    self.camera.last_position = csvfile.tell()
        except Exception as e:
            print("Error during CSV writing:", str(e))