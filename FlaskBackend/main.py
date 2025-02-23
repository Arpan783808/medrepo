import tensorflow as tf
import numpy as np
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)
# from tf.keras.utils import get_custom_objects
# from tf.keras.layers import Layer

# Workaround to handle unknown layers
# get_custom_objects().update({"Cast": Layer})

# ---- Load models once for better performance ----
cardio_model = tf.keras.models.load_model("models/my_model.h5")
pneumonia_model = tf.keras.models.load_model("models/pneumonia.h5")
breast_cancer_model = tf.keras.models.load_model("models/breastCancer.h5")

# Create uploads directory if not exists
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return jsonify({"message": "API for Cardiovascular, Pneumonia & Breast Cancer Prediction"})

# ---- Cardiovascular Disease Prediction (Text-Based) ----
@app.route("/predictCardio", methods=["POST"])
def predict_cardiovascular():
    try:
        data = request.json
        input_features = data.get("features", [])  # Expecting a list of 14 values

        if len(input_features) != 14:
            return jsonify({"error": "Expected 14 input features"}), 400

        # Convert to NumPy array and reshape for prediction
        features_array = np.array(input_features).reshape(1, -1)

        # Make prediction
        prediction = cardio_model.predict(features_array)
        predicted_class = int(np.argmax(prediction, axis=1)[0])  # Get class with highest probability

        return jsonify({"prediction": predicted_class})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---- Pneumonia Prediction (Image-Based) ----
@app.route("/predictPneumonia", methods=["POST"])
def predict_pneumonia():
    return predict_disease(pneumonia_model, "pneumonia")

# ---- Breast Cancer Prediction (Image-Based) ----
@app.route("/predictBreastCancer", methods=["POST"])
def predict_breast_cancer():
    return predict_disease(breast_cancer_model, "breast cancer")

# ---- Generic Function for Image-Based Predictions ----
def predict_disease(model, disease_name):
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files["image"]
        image_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(image_path)

        # Load and preprocess image
        image = Image.open(image_path).convert("RGB")
        image = image.resize((128, 128))  # Resize for the model
        image_array = np.array(image) / 255.0  # Normalize
        image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

        # Predict
        prediction = model.predict(image_array)
        predicted_class = int(np.argmax(prediction, axis=1)[0])  # Get class with highest probability

        return jsonify({"prediction": predicted_class, "disease": disease_name})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
