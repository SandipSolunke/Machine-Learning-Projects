import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import seaborn as sns
import pickle 


#Read CSV file
data=pd.read_csv("data.csv")


#Remove unwanted coloums
db=data[['Ratings', 'RAM', 'ROM', 'Mobile_Size','Primary_Cam', 'Selfi_Cam', 'Battery_Power', 'Price']]


#Handling Nulls
mins=db[db>0.1].min()
db["Ratings"]=db['Ratings'].fillna(value=mins["Ratings"])
db["RAM"]= db['RAM'].fillna(value=mins["RAM"])
db["ROM"]=db['ROM'].fillna(value=mins["ROM"])
db["Mobile_Size"]= db['Mobile_Size'].fillna(value=mins["Mobile_Size"])
db["Selfi_Cam"]=db['Selfi_Cam'].fillna(value=mins["Selfi_Cam"])


#Describe data
# plt.figure(figsize = (10,8))
# sns.distplot(db['Price'],hist = True, label = 'Price')
# plt.show()
# print(db.describe())



#Seperating X and Y
X = db.iloc[:,:-1].values
y = db.iloc[:,-1].values


#Spliting data into test data and training data
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=1)

#Initializing Model
model=RandomForestRegressor()


#Training Model
model.fit(X_train,y_train)

#Saving model
pickle.dump(model, open('model.pkl', 'wb'))

#Prediction
test=np.array([4.5,8,128,6.7,48,12,4700])
print(model.predict([test]))