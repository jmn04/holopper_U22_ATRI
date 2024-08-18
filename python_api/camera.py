import cv2
import mediapipe as mp
import time
import numpy as np
import pandas as pd
from new_finger import Finger
import csv
import mmap
import os
from finger_array import FingerArray
from send_data import Send_data
from reset import Reset
from connect_camera import ConnectCamera
import global_value as glb

""" 
set_poseのElseが必要
"""
def main():
    mp_drawing = mp.solutions.drawing_utils
    mp_drawing_styles = mp.solutions.drawing_styles
    mp_hands = mp.solutions.hands
    finger_array = FingerArray()
    # Webカメラから入力
    camera = ConnectCamera()
    reset = Reset(camera)
    camera.set(reset)
    sd = Send_data(camera)
    sd.create(camera.filename)
    glb.cap = cv2.VideoCapture(-1)
    reset.clear_file()
    # MediaPipeの手の検出モデルを初期化
    with mp_hands.Hands(
        model_complexity=0,
        max_num_hands=1,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5) as hands:
        while glb.cap.isOpened():
            success, image = glb.cap.read()
            if not success:
                print("Ignoring empty camera frame.")
                break
            
            image.flags.writeable = False
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = hands.process(image)
            # 検出された手の骨格をカメラ画像に重ねて描画
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    mp_drawing.draw_landmarks(
                        image,
                        hand_landmarks,
                        mp_hands.HAND_CONNECTIONS,
                        mp_drawing_styles.get_default_hand_landmarks_style(),
                        mp_drawing_styles.get_default_hand_connections_style())
                    # スワイプ検出
                    fingerData = Finger(hand_landmarks)

                    fingerData.detectFingerPose()

                    finger_array.set_clear_pose(fingerData.clear())

                    finger_array.set_swipe_pose(fingerData.check_swipe())

                    check_zoom = fingerData.check_zoom()
                    check_zoom_up = check_zoom[0]
                    check_zoom_out = check_zoom[1]

                    finger_array.set_zoom_up_pose(check_zoom_up)
                    finger_array.set_zoom_out_pose(check_zoom_out)

                    finger_array.set_df()

                    finger_array.set_do_pose()

                    if finger_array.do_clear:
                        finger_array.clear_set_pose()
                        camera.clear()

                    if finger_array.do_swipe:
                        camera.swipe()

                    if finger_array.do_zoom_up:
                        camera.zoom_up()

                    if finger_array.do_zoom_out:
                        camera.zoom_out()
            else:
                reset.reset_pose_value()
            yield camera.send_command
            """ send_data.connect_memory() """
            cv2.putText(image, camera.display_message, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            cv2.imshow('MediaPipe Hands', cv2.flip(image, 1))
            if cv2.waitKey(5) & 0xFF == 27:
                break
            
            time.sleep(1/30)
    glb.cap.release()
    cv2.destroyAllWindows()