# icecream-counter-using-yolov11-tfjs

## Starting page
![{053E229F-1D41-4525-B9F8-F3D47691307D}](https://github.com/user-attachments/assets/a8ab06f4-564d-46c2-b04b-51bca5677730)

## Main page
![image](https://github.com/user-attachments/assets/c7fa5747-930d-4a36-8c35-92fdf9985a10)
![{7640B05F-ED30-423D-9F88-6D47B7DB5788}](https://github.com/user-attachments/assets/cc95bbc1-d8ac-44f2-91e0-8609d80793d8)

## Installation
To run this project locally, follow these steps:

```bash
git clone https://github.com/Forager87189/icecream-counter-using-yolov11-tfjs.git
npm install
npm start
```
## Model
`Yolov11s` model converted to tensorflow.js

## Directory Structure
![{14615BC0-6192-4D80-B267-4103389CDB37}](https://github.com/user-attachments/assets/9864f018-a25d-4fc6-9b45-7bdffc7789e2)

# Custom model Step by step

## 1. Gather data and manage it in roboflow

### Roboflow

https://roboflow.com/

- Make a project

- Label and preprocess the data

## 2. Use Google-Colab to train the model

### Google-Colab
https://colab.research.google.com/github/roboflow-ai/notebooks/blob/main/notebooks/train-yolov8-object-detection-on-custom-dataset.ipynb

There is no problem using a model other than yolov8

## 3. Convert the model to tensorflow.js

```bash
from ultralytics import YOLO

# Load a model
model = YOLO("best.pt")  # load the trained model

# Export the model
model.export(format="tfjs")
```

Be mindful of package versions.
![image](https://github.com/user-attachments/assets/441f6f77-18cb-4854-a383-c9ccdd68bf27)
![image](https://github.com/user-attachments/assets/500ccdc0-7c7f-43a4-ac82-73ecf6d2e2e4)

## 4. Update your local files
- Copy best_web_model to ./public

- Update `src/utils/labels.json` with your new classes.

- Update `modelName` in `src/pages/main.jsx` to new model name

```
// model configs
const modelName = "best"; // change to new model name
```

- Change variables in `src/pages/main.jsx` and `src/utils/renderBox.js` ( Variables to count icecreams )

# Mobilephone webcam using DroidCam

## DroidCam

### Android App
https://play.google.com/store/apps/details?id=com.dev47apps.droidcam&hl=ko&showAllReviews=true&pli=1

### PC
https://www.dev47apps.com/droidcam/windows/

Connect your phone and PC with DroidCam and open webcam

( If iOS, use usb. read an explanation on PC link )

# Contact
For questions or feedback, feel free to reach out at [qkrwns813@naver.com] or via GitHub profile.

# Reference
https://github.com/ultralytics/ultralytics

https://github.com/Hyuto/yolov8-tfjs
