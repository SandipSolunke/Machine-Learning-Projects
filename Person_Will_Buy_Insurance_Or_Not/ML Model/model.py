import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

def Sigmoid(nets):
  return 1/(1+(np.exp(-nets)))


def Gradiant_Descent(ages,affordability,y):
    iterations=10000
    costArray=np.zeros(iterations)
    stepArray=np.zeros(iterations)

    #Learning Rate
    c=0.01
    
    #Initial values of m and b
    w1=1
    w2=1
    bias=0
    n=len(ages)

    for i in range(iterations):
        error1=0
        error2=0
        error3=0
        squared_error=0

        #calculating errors
        for j in range(len(ages)):
            #nets
            nets=w1*ages[j]+w2*affordability[j]+bias

            #output=f(nets)
            y_pred=Sigmoid(nets)


            error1+=ages[j]*(y[j]-y_pred)
            error2+=affordability[j]*(y[j]-y_pred)
            error3+=(y[j]-y_pred)

            squared_error+=(y[j]-y_pred)**2

        #derivative of errors
        w1d=-(1/n)*(error1)
        w2d=-(1/n)*(error2)
        bd=-(1/n)*(error3)

        #cost function
        cost=squared_error/n
        costArray[i]=cost
        stepArray[i]=i

        #changing wieghts
        w1=w1-c*w1d
        w2=w2-c*w2d
        bias=bias-c*bd
    print(f"cost function={cost}")
    return w1,w2,bias


def predict_res(age,af):
     print(w1,w2,b)
     pred=w1*age+w2*af+b
     pred=Sigmoid(pred)
     if(pred>0.5):
        return 1
     return 0

app = Flask(__name__)

CORS(app, support_credentials=True)
CORS(app)

@app.route('/api',methods=['POST'])
def predict():
    data = request.get_json(force=True)

    arg1=int(data['age'])/100
    arg2=int(data['affordablity'])

    prediction = predict_res(arg1,arg2)
    print(prediction)
    return jsonify(prediction)


if __name__ == '__main__':

    ages=np.array([22,25,47,52,46,56,55,60,62,61,18,28,27,29,49,55,25,58,19,18,21,26,40,45,50,54,23,46])
    ages=ages/100
    affordability=np.array([1,0,1,0,1,1,0,0,1,1,1,1,0,0,1,1,0,1,0,1,1,0,1,1,1,1,1,1])
    y=np.array([0,0,1,0,1,1,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0])

    print("Model Training")
    w1,w2,b=Gradiant_Descent(ages,affordability,y)
    
    print("Model Trained")
    app.run(port=5000, debug=True)