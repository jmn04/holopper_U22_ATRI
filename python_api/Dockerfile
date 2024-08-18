FROM python:3.10

WORKDIR /usr/src/app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN apt -y update && apt -y upgrade
RUN apt -y install libopencv-dev
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y v4l-utils
RUN apt-get install -y libgl1-mesa-dev

COPY . .

CMD ["python", "test.py"]