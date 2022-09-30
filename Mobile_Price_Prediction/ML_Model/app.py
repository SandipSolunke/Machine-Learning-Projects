import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pickle

app = Flask(__name__)

CORS(app, support_credentials=True)
CORS(app)

@app.route('/api',methods=['POST'])
def predict():
    data = request.get_json(force=True)

    rating=float(data['Rating'])
    ram=float(data['RAM'])
    rom=float(data['ROM'])
    battery=float(data['Battery'])
    display=float(data['Display'])
    p_cam=float(data['P_Cam'])
    s_cam=float(data['S_Cam'])


    test=np.array([rating,ram,rom,display,p_cam,s_cam,battery])
    print("Input :")
    print(test)
    prediction = pickled_model.predict([test])
    print(prediction[0])
    return jsonify(prediction[0])


if __name__ == '__main__':
    pickled_model = pickle.load(open('model.pkl', 'rb'))

    app.run(port=5000, debug=True)