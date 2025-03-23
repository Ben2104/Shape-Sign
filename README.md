# Shape-Sign
Shape-Sign is an interactive application that utilizes hand gesture recognition models to help users learn and engage with sign language. This project consists of a frontend interface and a machine learning model running simultaneously.


# Getting Started
To run this project, you will need to start both the frontend and the model as a backend on separate terminals. Follow the steps below to set it up.
## Frontend
1. Clone the repository
```
  git clone [URL repository]
```

2. Navigate to the frontend directory:
```
  cd frontend
```
3. Install dependencies:
```
  npm install
```
4. Run the frontend:
```
  npm run dev
```
## Backend
Open a new terminal and navigate to the models directory:
```
  cd models
```
Make sure pip is installed.
Install dependencies.
```
pip install tensorflow numpy pandas mediapipe opencv-python pycaw
```
- Tensorflow: model training.
- Numpy/Pandas: data processing.
- Mediapipe: detect hands' landmarks.
- Opencv: capture video.
- Pycaw: mouse control.
  
Run the models:
```
  python main.py
```

# Model Architecture
## Neural Network
```python
model = Sequential(
    [
        # InputLayer((30,63)),
        InputLayer((60, 63)),
        LSTM(128, return_sequences=True),
        LSTM(128, return_sequences=False),
        Dense(64, activation="relu"),
        Dense(32,activation='relu'),
        Dense(y.shape[1], activation="softmax"),
    ]
)

early_stopping = EarlyStopping(
    monitor="val_accuracy", patience=10, restore_best_weights=True
)

model.compile(
    loss="categorical_crossentropy", metrics=["accuracy"], optimizer=Adam(0.001)
)
```
## Long Short Term Memory
```python
model = Sequential([
    InputLayer((len(X.columns),)),
    Dense(512, activation='relu'),
    Dense(256,activation="relu"),
    Dense(64,activation='relu'),
    Dense(26,activation='softmax')
])

early_stopping = EarlyStopping(monitor='val_accuracy',patience=10,restore_best_weights=True)

model.compile(loss = "categorical_crossentropy", metrics =['accuracy'],optimizer = Adam(0.001))
```

# Technologies Used
- Frontend: NextJS, ReactJS, TailwindCSS
- BackEnd: Tensorflow, Python
