import numpy as np
import pandas as pd
import math

class Finger:
    
    finger_array = {
        'thumb_finger_pip':2,
        'thumb_finger_tip':4,
        'index_finger_pip':6,
        'index_finger_tip':8,
        'middle_finger_pip': 10,
        'middle_finger_tip': 12,
        'ring_finger_pip': 14,
        'ring_finger_tip': 16,
        'pinky_finger_pip': 18,
        'pinky_finger_tip': 20
    }
    
    
    def __init__(self,hand_landmarks):
        self.landmarks = hand_landmarks.landmark
        
    def get_finger_for_hew(self,finger_num):
        return self.landmarks[finger_num]
    
    def calcAngle(self,p0, p1, p2): 
        a1 = p1.x-p0.x
        a2 = p1.y-p0.y
        b1 = p2.x-p1.x
        b2 = p2.y-p1.y
        dot_product = a1 * b1 + a2 * b2
        magnitude_a = math.sqrt(a1**2 + a2**2)
        magnitude_b = math.sqrt(b1**2 + b2**2)

        angle = math.acos(dot_product / (magnitude_a * magnitude_b))
        angle_degrees = math.degrees(angle)
        return angle_degrees

    def calcFingerAngle(self,p0, p1, p2, p3, p4):
        result = 0
        result += self.calcAngle(p0, p1, p2)
        result += self.calcAngle(p1, p2, p3)
        result += self.calcAngle(p2, p3, p4)
        return result
    
    def detectFingerPose(self):
        self.thumbIsOpen = self.calcFingerAngle(self.landmarks[0], self.landmarks[1], self.landmarks[2], self.landmarks[3], self.landmarks[4]) < 70
        self.firstFingerIsOpen = self.calcFingerAngle(self.landmarks[0], self.landmarks[5], self.landmarks[6], self.landmarks[7], self.landmarks[8]) < 100
        self.secondFingerIsOpen = self.calcFingerAngle(self.landmarks[0], self.landmarks[9], self.landmarks[10], self.landmarks[11], self.landmarks[12]) < 100
        self.thirdFingerIsOpen = self.calcFingerAngle(self.landmarks[0], self.landmarks[13], self.landmarks[14], self.landmarks[15], self.landmarks[16]) < 100
        self.fourthFingerIsOpen = self.calcFingerAngle(self.landmarks[0], self.landmarks[17], self.landmarks[18], self.landmarks[19], self.landmarks[20]) < 100
        
    def clear(self):
        is_pose = False
        if (self.thumbIsOpen and self.firstFingerIsOpen and self.secondFingerIsOpen and self.thirdFingerIsOpen and self.fourthFingerIsOpen):
            is_pose = True
        return is_pose
    
    def check_swipe(self):
        is_pose = False
        if (not self.thumbIsOpen and self.firstFingerIsOpen and not self.secondFingerIsOpen and not self.thirdFingerIsOpen and not self.fourthFingerIsOpen):
            is_pose = True
        return is_pose
    
    def check_zoom(self):
        is_pose_zoomup = False
        is_pose_zoomout = False
        if (not self.thumbIsOpen and self.firstFingerIsOpen and self.secondFingerIsOpen and self.thirdFingerIsOpen and self.fourthFingerIsOpen):
            is_pose_zoomup = True
        elif (not self.thumbIsOpen and self.firstFingerIsOpen and self.secondFingerIsOpen and self.thirdFingerIsOpen and not self.fourthFingerIsOpen):
            is_pose_zoomout = True
        return is_pose_zoomup,is_pose_zoomout