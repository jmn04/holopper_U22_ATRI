import numpy as np
#メインの処理をまとめる関数
class ConnectCamera:
    
    #スワイプ指ポーズ判定時の人差し指先端の座標を保存
    before_swipe_array = np.array([0,0])
    #ズーム指ポーズ判定時の親指先端の座標を保存
    before_zoom_thumb_array = np.array([0,0])
    #ズーム指ポーズ判定時の人差し指先端の座標を保存
    before_zoom_index_array = np.array([0,0])
    #タイマーの初期値
    start_time = -1
    #mediapipeで起動したカメラの表示画面に表示する文字用
    display_message = ""
    #各ポーズをしているかの判定用
    set_pose = False
    check_swipe = False
    check_zoom = False
    check_zoomup = False
    check_zoomput = False
    #blenderに送るコマンドの保存用
    send_command = "none"
    #前に読み込んだCSVの最後の位置の保存用
    last_position = 0
    #共有するファイルの保存場所
    filename = "./share.csv"
    #CSVファイルのヘッダーに使用する値
    fieldnames = ['command']
    #指の距離（ズーム用）
    before_distance = 0
    
    finger_data = ""
    
    reset = ""
    
    def set(self,reset):
        self.reset = reset
    
    def get_finger_position(self,fingerData,finger_num):
        self.finger_data = fingerData
        finger_coords = fingerData.get_finger_for_hew(finger_num)
        position_data = np.array([finger_coords.x,finger_coords.y])
        return position_data
    
        
    def set_value(self,message,command):
        self.display_message = message
        self.send_command = command
        self.reset.reset_template()
        
    """ def swipe(self,fingerData):
        index_finger = self.get_finger_position(fingerData,8)
        self.display_message =  "check_swipe"
        self.set_value("check_swipe","swipe") """
                
    def set_swipe_pose(self,fingerData):
        self.before_swipe_array = self.get_finger_position(fingerData,8)
        self.display_message =  "check_swipe_finger"
        self.set_pose = True
        
    def get_distance(self,from_finger,to_finger):
            from_array = self.get_finger_position(self.fingerData,from_finger)
            to_array = self.get_finger_position(self.fingerData,to_finger)
            distance = np.linalg.norm(from_array-to_array)
            return distance
            
    def swipe(self):
        self.display_message = "check_swipe_finger"
        self.set_value("check_swipe","swipe")
    
    def zoom_up(self):
        self.display_message =  "check_zoomup_finger"
        self.set_value("check_zoomup","zoomup")
        
    def zoom_out(self):
        self.display_message =  "check_zoomout_finger"
        self.set_value("check_zoomout","zoomout")
    
    def clear(self):   
        self.display_message =  "clear"
        self.set_value("clear","none")