import React, { useState } from "react";
import axios from "axios";
import "../compcss/cvd.css";

// Define an array of field objects with label and optional constraints.
const fields = [
  { label: "Age (Days)", type: "number" },
  { label: "Gender (1: Female, 2: Male)", type: "number", min: 1, max: 2, step: 1 },
  { label: "Height (cm)", type: "number" },
  { label: "Weight (kg)", type: "number" },
  { label: "Systolic BP (ap_hi)", type: "number" },
  { label: "Diastolic BP (ap_lo)", type: "number" },
  { label: "Cholesterol (1: Normal, 2: Above Normal, 3: Well Above Normal)", type: "number", min: 1, max: 3, step: 1 },
  { label: "Glucose (1: Normal, 2: Above Normal, 3: Well Above Normal)", type: "number", min: 1, max: 3, step: 1 },
  { label: "Smoking (0: No, 1: Yes)", type: "number", min: 0, max: 1, step: 1 },
  { label: "Alcohol Intake (0: No, 1: Yes)", type: "number", min: 0, max: 1, step: 1 },
  { label: "Physical Activity (0: No, 1: Yes)", type: "number", min: 0, max: 1, step: 1 },
  { label: "Cardio (0: Absence, 1: Presence)", type: "number", min: 0, max: 1, step: 1 },
  { label: "Age (Years)", type: "number" },
  { label: "BMI (Body Mass Index)", type: "number" }
];

const bpCategoryMapping = {
  0: "Normal",
  1: "Elevated",
  2: "Hypertension Stage 1",
  3: "Hypertension Stage 2"
};

const PredictionForm = () => {
  // Initialize state with an array length equal to the number of fields.
  const [values, setValues] = useState(Array(fields.length).fill(""));
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      // Convert input values to numbers.
      const numericValues = values.map(Number);
      const response = await axios.post("http://10.100.91.206:5001/predictCardio", {
        features: numericValues
      });
      console.log(response.data);
      // Map the numeric prediction to the corresponding bp_category label.
      const predictedLabel = bpCategoryMapping[response.data.prediction];
      setPrediction(predictedLabel);
    } catch (err) {
      console.log(err);
      setError("Error fetching prediction");
    }
  };

  return (
    <div className="prediction-container">
      <h2 className="prediction-title">Blood Pressure Category Prediction</h2>
      <form onSubmit={handleSubmit} className="prediction-form">
        {fields.map((field, index) => (
          <div key={index} className="form-group">
            <label className="form-label">{field.label}:</label>
            <input
              type={field.type}
              className="form-input"
              value={values[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              required
              // Set min, max, and step if defined
              min={field.min !== undefined ? field.min : undefined}
              max={field.max !== undefined ? field.max : undefined}
              step={field.step !== undefined ? field.step : undefined}
            />
          </div>
        ))}
        <div className="form-group" style={{ gridColumn: "1 / -1" }}>
          <button type="submit" className="submit-button">
            Predict
          </button>
        </div>
      </form>

      {prediction !== null && (
        <div className="prediction-result">
          <p className="prediction-text">
            Predicted BP Category: {prediction}
          </p>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
