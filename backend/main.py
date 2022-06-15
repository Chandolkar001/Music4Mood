import base64
from urllib.request import Request
from flask import jsonify
from jinja2 import PrefixLoader
import uvicorn
from fastapi import FastAPI, Request, File,UploadFile
from io import BytesIO
import numpy as np
from PIL import Image
import tensorflow as tf
import cv2
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import ImageFile
from typing import Any, Dict, AnyStr, List, Union
ImageFile.LOAD_TRUNCATED_IMAGES = True

app = FastAPI()

JSONObject = Dict[AnyStr, Any]
JSONArray = List[Any]
JSONStructure = Union[JSONArray, JSONObject]


class Img(BaseModel):
    imgcode : str

MODEL = tf.keras.models.load_model('models\elon_musk_amar_rahe.h5')
CLASS_NAMES = ['neutral','happy','sad']

@app.get('/ping')
async def index():
    return {'message':'Hello, Harsh'}

def read_file_as_image(data) -> np.ndarray:
    img = np.array(Image.open(BytesIO(data)))
    return img

@app.post('/predict')
# async def predict(file: UploadFile = File(...)):
async def predict(img1: JSONStructure = None):
    # input = request.json()
    myimage = img1["imageResponse"]
    # myimage = img.imgcode
    if myimage != None:
        print("Image working")
    # print(myimage)
    imgdata = base64.b64decode(str(myimage))
    image2 = Image.open(BytesIO(imgdata))
    image = cv2.cvtColor(np.array(image2), cv2.COLOR_BGR2RGB)
    # image = read_file_as_image(await file.read())
    # cv2.imwrite('save.jpeg', image)
    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(gray,1.1,4)
    face_roi = None
    for x, y, w, h in faces:
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = image[y:y+h, x:x+w]
        cv2.rectangle(image, (x, y), (x+w, y+h), (255, 0, 0), 2)
        facess = faceCascade.detectMultiScale(roi_gray)
        if len(facess) == 0:
            print("Face not detected")
        else:
            for (ex, ey, ew, eh) in facess:
                face_roi = roi_color[ey:(ey+eh), ex:(ex+eh)]
    
    img_size = 224
    final_image = cv2.resize(face_roi,(img_size,img_size))
    final_image = np.expand_dims(final_image,axis= 0)
    final_image = final_image/255.0

    Predictions = MODEL.predict(final_image)
    p = CLASS_NAMES[np.argmax(Predictions[0])]
    print(p)
    data = {"Emotion" : p } 

    return data

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:19000'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    uvicorn(app, host = '192.168.56.1',port=8000)