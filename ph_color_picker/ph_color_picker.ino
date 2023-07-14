/*
  Object classifier by color
  --------------------------

  Uses RGB color sensor input to Neural Network to classify objects
  Outputs object class to serial using unicode emojis

  Note: The direct use of C/C++ pointers, namespaces, and dynamic memory is generally
        discouraged in Arduino examples, and in the future the TensorFlowLite library
        might change to make the sketch simpler.

  Hardware: Arduino Nano 33 BLE Sense board.

  Created by Don Coleman, Sandeep Mistry
  Adapted by Dominic Pajak

  This example code is in the public domain.
*/

// Arduino_TensorFlowLite - Version: 0.alpha.precompiled
#include <TensorFlowLite.h>

#include <tensorflow/lite/micro/all_ops_resolver.h>
#include <tensorflow/lite/micro/tflite_bridge/micro_error_reporter.h>
#include <tensorflow/lite/micro/micro_interpreter.h>
#include <tensorflow/lite/schema/schema_generated.h>
#include <tensorflow/lite/micro/compatibility.h>
#include <Arduino_APDS9960.h>

#include "model.h"

// global variables used for TensorFlow Lite (Micro)
tflite::MicroErrorReporter tflErrorReporter;

// pull in all the TFLM ops, you can remove this line and
// only pull in the TFLM ops you need, if would like to reduce
// the compiled size of the sketch.
tflite::AllOpsResolver tflOpsResolver;

const tflite::Model* tflModel = nullptr;
tflite::MicroInterpreter* tflInterpreter = nullptr;
TfLiteTensor* tflInputTensor = nullptr;
TfLiteTensor* tflOutputTensor = nullptr;

// Create a static memory buffer for TFLM, the size may need to
// be adjusted based on the model you are using
constexpr int tensorArenaSize = 8 * 1024;
byte tensorArena[tensorArenaSize];

// array to map gesture index to a name
const char* CLASSES[] = {
  "4.5 PH",   // 4.5
  "5.0 PH",   // 5.0
  "5.5 PH",   // 5.5
  "5.75 PH",  // 5.75
  "6.0 PH",   // 6.0
  "6.25 PH",  // 6.25
  "6.5 PH",   // 6.5
  "6.75 PH",  // 6.75
  "7.0 PH",   // 7.0
  "7.25 PH",  // 7.25
  "7.5 PH",   // 7.5
  "8.0 PH",   // 8.0
  "8.5 PH",   // 8.5
  "9.0 PH",   // 9.0
};

#define NUM_CLASSES (sizeof(CLASSES) / sizeof(CLASSES[0]))

void setup() {
  Serial.begin(9600);
  while (!Serial) {};

  Serial.println("Object classification using RGB color sensor");
  Serial.println("--------------------------------------------");
  Serial.println("Arduino Nano 33 BLE Sense running TensorFlow Lite Micro");
  Serial.println("");

  if (!APDS.begin()) {
    Serial.println("Error initializing APDS9960 sensor.");
  }

  // get the TFL representation of the model byte array
  tflModel = tflite::GetModel(model);
  if (tflModel->version() != TFLITE_SCHEMA_VERSION) {
    Serial.println("Model schema mismatch!");
    while (1);
  }

  // Create an interpreter to run the model


  tflInterpreter = new tflite::MicroInterpreter(tflModel, tflOpsResolver, tensorArena, tensorArenaSize, nullptr, nullptr);

  // Allocate memory for the model's input and output tensors
  tflInterpreter -> AllocateTensors();

  // Get pointers for the model's input and output tensors
  tflInputTensor = tflInterpreter->input(0);
  tflOutputTensor = tflInterpreter->output(0);
}

void loop() {
  int r, g, b, p, c;
  float sum;

  // check if both color and proximity data is available to sample
  while (!APDS.colorAvailable() || !APDS.proximityAvailable()) {}

  // read the color and proximity sensor
  APDS.readColor(r, g, b, c);
  p = APDS.readProximity();
  sum = r + g + b;

  // check if there's an object close and well illuminated enough
  if (p == 0 && c > 10 && sum > 0) {

    float redRatio = r / sum;
    float greenRatio = g / sum;
    float blueRatio = b / sum;

    // input sensor data to model
    tflInputTensor->data.f[0] = redRatio;
    tflInputTensor->data.f[1] = greenRatio;
    tflInputTensor->data.f[2] = blueRatio;

    // Run inferencing
    TfLiteStatus invokeStatus = tflInterpreter->Invoke();
    if (invokeStatus != kTfLiteOk) {
      Serial.println("Invoke failed!");
      while (1);
      return;
    }

    // Output results
float maxPercentage = 0.0;
int maxIndex = 0;

// Declare an array to store the measured values
float measuredValues[10];
int measuredCount = 0;


for (int i = 0; i < NUM_CLASSES; i++) {
  //Serial.print(CLASSES[i]);
  //Serial.print(" ");
  float percentage = tflOutputTensor->data.f[i] * 100;
  //Serial.print(int(percentage));
  //Serial.print("%\n");

  if (percentage > maxPercentage) {
    maxPercentage = percentage;
    maxIndex = i;
  }
  
  // Store the measured value for Classes[maxIndex]
  if (i == maxIndex && measuredCount < 10) {
    measuredValues[measuredCount] = percentage;
    measuredCount++;
  }
}

Serial.println();

// Calculate the average of the measured values
float sum = 0.0;
for (int i = 0; i < 10; i++) {
  sum += measuredValues[i];
}
float average = sum / 10;

// Print the average value
//Serial.print("Average of ");
Serial.print(CLASSES[maxIndex]);
//Serial.print(": ");
//Serial.println(average);
//Serial.println();

// Wait for the object to be moved away
while (!APDS.proximityAvailable() || (APDS.readProximity() == 0)) {}
  }

}