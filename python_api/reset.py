import numpy as np
import time
    
#変数を初期化するクラス

class Reset:
    
    cc = ""
    
    def __init__(self,ConnectCamera):
        self.cc = ConnectCamera
        
    
    def clear_file(self):
        with open(self.cc.filename, 'r') as file:
            lines = file.readlines()
        if lines:
            with open(self.cc.filename, 'w') as file:
                file.write(lines[0])
        else:
            return
            
    def reset_finger_array(self):
        self.cc.before_swipe_array = np.array([0,0])
        self.cc.before_zoom_thumb_array = np.array([0,0])
        self.cc.before_zoom_index_array = np.array([0,0])
        
    def reset_pose_value(self):
        self.cc.set_pose = False
        self.cc.check_swipe = False
        self.cc.check_zoomup = False
        self.cc.check_zoomout = False
    
    def reset_timer(self):
        self.cc.start_time = time.time()
        
    def reset_template(self):
        self.reset_finger_array()
        self.reset_pose_value()
        self.reset_timer()