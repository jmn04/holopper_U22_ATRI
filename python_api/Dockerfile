FROM python:3.10

WORKDIR /usr/src/app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN apt -y update && apt -y upgrade
RUN apt -y install libopencv-dev

COPY . .

CMD ["python", "test.py"]