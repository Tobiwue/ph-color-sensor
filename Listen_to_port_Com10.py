import serial
import json

COM_PORT = 'COM10'
BAUD_RATE = 9600

with serial.Serial(COM_PORT, BAUD_RATE) as ser:
    while True:
        if ser.in_waiting > 0:
            data = ser.readline().decode().strip().split("\"")[1].split()[0]
            json_data = {"ph_wert": data}
            json_object = json.dumps(json_data, indent=1)
            with open('C:\\Uni\\WI_Master\\BWA\\ph_messer\\src\\gemessen.json', 'w') as f:
                f.write(json_object)