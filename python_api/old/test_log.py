import csv
from flask import Flask, Response, jsonify
last_row = None
with open('./share.csv', 'r', newline='') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        last_row = row
str_command = [str(i) for i in last_row]
print(jsonify({'data': str_command}))