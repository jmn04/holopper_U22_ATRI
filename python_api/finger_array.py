import pandas as pd
from datetime import datetime

class FingerArray:
    """ 
    指がポーズをとっているか保存するクラス
    """
    finger_pose_check_df = pd.DataFrame(columns=[
        "datetime",
        "set_clear", 
        "set_swipe",
        "set_zoom_up",
        "set_zoom_out"
        ])
    check_frame = 10
    max_frame = 200
    set_clear = False
    set_swipe = False
    set_zoom_up = False
    set_zoom_out = False
    do_clear = False
    do_swipe = False
    do_zoom_up = False
    do_zoom_out = False
    
    def append_array(self,df):
        self.finger_pose_check_df.append(df)
        
    def set_df(self):
        new_data = pd.DataFrame([{
            "datetime": datetime.now(),
            "set_clear": self.set_clear,
            "set_swipe": self.set_swipe,
            "set_zoom_up": self.set_zoom_up,
            "set_zoom_out": self.set_zoom_out
        }])
        self.finger_pose_check_df = self.finger_pose_check_df.append(new_data, ignore_index=True)
        
    def clear_set_pose(self):
        self.set_clear = False
        self.set_swipe = False
        self.set_zoom_up = False
        self.set_zoom_out = False
        
    def set_clear_pose(self,check):
        if(check):
            self.set_clear = True
        else:
            self.set_clear = False
        
    def set_swipe_pose(self,check):
        if(check):
            self.set_swipe = True
        else:
            self.set_swipe = False
        
    def set_zoom_up_pose(self,check):
        if(check):
            self.set_zoom_up = True
        else:   
            self.set_zoom_up = False
        
    def set_zoom_out_pose(self,check):
        if(check):
            self.set_zoom_out = True
        else:
            self.set_zoom_out = False
    
    def check_set_pose(self):
        recent_rows = self.finger_pose_check_df.tail(self.check_frame)
        for col in recent_rows.columns:
            col_values = recent_rows[col]
            count = 0
            for value in col_values:
                if value == True:
                    count += 1
            if(count == self.check_frame):
                return col
        return ""
    
    def clear_do_pose(self):
        self.do_clear = False
        self.do_swipe = False
        self.do_zoom_up = False
        self.do_zoom_out = False

    def set_do_pose(self):
        
        column_name = self.check_set_pose()
        if column_name == "set_clear":
            self.do_clear = True
        elif column_name == "set_swipe":
            self.do_swipe = True
        elif column_name == "set_zoom_up":
            self.do_zoom_up = True
        elif column_name == "set_zoom_out":
            self.do_zoom_out = True
        else:
            self.clear_do_pose()