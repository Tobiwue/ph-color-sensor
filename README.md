# PH-Color-Sensor Methoden der Wissensverarbeitung SoSe23 - HTW Berlin FB4 M.SC

# 1 Einführung
## 1.1 Motivation
Im Rahmen des Moduls 'Wissensmanagement' im Wirtschaftsinformatik Masterstudium an der HTW-Berlin bestand die Aufgabe, ein Projekt umzusetzen, in welchem die Themen Open-Source Hardware, Machine Learning oder Internet of Things behandelt werden. Durch gemeinsame Ideenfindung wurde sich für die Umsetzung eines PH-Wert-Messgeräts entschieden.
Zusätzlich wurde sich darauf festgelegt, diese Messungen an Bodenproben durchzuführen, um Pflanzen die perfekte Grundlage zum Wachsen bieten zu können.

## 1.2 Zielsetzung
Durch ein Messgerät welches mit einem Arduino gekoppelt ist, soll der PH Wert gemessen und mit einem in einer Datenbank hinterlegtem Idealwert abgeglichen werden. Der Benutzer bekommt daraufhin das Feedback, ob seine Pflanze den perfekten Boden hat oder ob Ähnedrungsbedarf besteht. Das Feedback soll in einem simulierten Smartphone App zurückgegeben werden.

## 1.3 Vorgehensweise
Zuerst wurden verschiedene Messungsmöglichkeiten betrachtet. In Rücksprache mit den Dozenten wurde ein Messgerät genutzt, welches mit einem Arduino (welcher? nicht der Sense) verbunden werden konnte. Dieses Messgerät erwies sich nach ausgiebigen Versuchen jedoch als fehlerhaft. Nachdem ein Großteil der Bearbeitungszeit damit verbracht wurde, hinreichende Daten durch das Messgerät zu erhalten, was leider nicht möglich war, wurde sich entschieden, die ursprüngliche Projektidee anzupassen. Mittels des eingebauten Farbsensors in dem Arduino Sense 33 BLE werden nun Farben ausgewertet, welche analoge PH-Teststreifen jeweils zurückgeben. Damit ist es möglich, durch bestimmte Farben festzustellen, welcher PH Wert die jeweilige Erdprobe nachweist. Der Arduino wird hierbei mittels Machine Learning darauf trainiert, bei verschiedenen Inputs den passenden Output zu liefern.

Parallel dazu wurde eine WebApp erstellt, in welcher aufbereitete Daten zu den idealen PH-Werten für verschiedene Pflanzen mit gemessenen Werten verglichen werden können. Weiterhin wurde eine Lösung implementiert, mit welcher die gemessenen Daten des Farbsensors auf dem Arduino in der App genutzt werden können. 

# 2 Daten

## 2.1 Datenbeschaffung Farben
Znächst wurden analoge PH-Teststreifen, die Werte im Bereich von 4,5 bis 9 auslesen können, gekauft.[1] Es wurde sich für diese PH-Streifen entschieden, da sie einen realistischen Wertebereich umfassen und feingradiger sind, als PH-Streifen, die das gesamte Spektrum erfassen können sollen. Auf der Verpackung der PH-Streifen sind unterschiedliche Farben verschiedenen PH-Werten zugewiesen. Mithilfe eines Python-Programmes (QUELLE) konnte ein Modell trainiert werden, das über den Arduino Farbsensor die entsprechende Farbe erkennt und einem PH-Wert zuordnet. Dabei wurden als Trainings- und Testdaten die Messungen der möglichen Werte auf der Verpackung der Teststreifen verwendet. 

## 2.2 Datenbeschaffung idealer PH-Werte
Die Daten zu den idealen Ph-Werten verschiedener Pflanzen wurde einer Webseite entnommen, die eben diese Informationen für (Hobby-)Gärtner bereitstellen.[2] Die dort hinterlegten Werte sind gruppiert in Kategorien und beinhalten jeweils eine Spanne für den idealen PH-Wert der einzelnen Pflanzen. Um die Daten in der WebApp nutzbar zu machen, wurden diese zunächst aus der Website in Microsoft Excel herauskopiert, dort die PH-Wert-Spannen getrennt, sodass ein Minimal- und ein Maximal-Wert entsteht und daraufhin als CSV-Datei gespeichert. Daraufhin konnte dieses über ein Python-Programm in ein JSON-Dateiformat konvertiert werden.[3] Die einzelnen Werte wurden nach Ausführung des Programms in manuell ihre Kategorien eingeteilt und die gesamte Datei im Verzeichnis der Applikation gespeichert:
```
import csv

new_data_dict = {}
label_dict = {}
with open("https://raw.githubusercontent.com/Tobiwue/ph-color-sensor/master/data/pflanzen_idealwerte.csv", 'r') as data_file:
    data = csv.DictReader(data_file, delimiter=";")
    for row in data:
        item = new_data_dict.get(row["Pflanze"], dict())
        item["Pflanze"] = row["Pflanze"]
        item["PH_MIN"] = row["PH_MIN"]
        item["PH_MAX"] = row["PH_MAX"]
        print(item)
```

# 3 Konzept und Realisierung
Für das Projekt haben wurde ein Konzept erstellt, welches verschiedene Komponenten und die Kommunikation zwischen ihnen beinhaltet. Folgende Abbildung stellt dies einmal schematisch dar:
![alt text](https://github.com/Tobiwue/ph-color-sensor/blob/pictures/schema.svg?raw=true)
Demnach muss zunächst der PH-Teststreifen verwendet werden, um den PH-Wert des Bodens einer Pflanze zu messen. Daraufhin wird dieser Streifen über den Farbsensor des Arduinos gehalten, sodass die Farbe erkannt werden kann. Durch eine Verbindung über ein USB-Kabel zwischen dem Arduino und einem Notebook, wobei bei dem Notebook der USB-Port COM10 verwendet werden muss, können die gemessenen Daten ausgetauscht werden. Auf dem Notebook läuft ein weiteres Python-Programm, welches auf den Port COM10 hört und alle eingehenden Werte in eine Datei schreibt, wobei stets der neuste Wert den jeweils älteren überschreibt: [4]

```
import serial
import json

COM_PORT = 'COM10'
BAUD_RATE = 9600

with serial.Serial(COM_PORT, BAUD_RATE) as ser:
    while True:
        if ser.in_waiting > 0:
            data = ser.readline().decode().strip()
            json_data = {"ph_wert": data}
            json_object = json.dumps(json_data, indent=1)
            with open("https://raw.githubusercontent.com/Tobiwue/ph-color-sensor/master/data/gemessen.txt", 'w') as f:
                f.write(json_object)
```
Weiterhin läuft auf dem PC ein React-Programm, dass über den Localhost und Port 3000 eine WebApp bereitstellt, die in Chrome als Smartphone-App simuliert werden kann. In dieser gibt es zwei primäre Ansichten. Zum einen eine Übersicht aller idealen PH-Werte, zum anderen eine Auswahl, bei welcher die Pflanze ausgewählt werden kann, für die der PH- Wert gemessen wurde. Nach dieser Auswahl und dem klick auf dem Button "..." wird der gemessene Wert aus der Datei gemessen.txt mit den idealwerten verglichen, sodass ggf. entsprechende Handlungsbedarfe angegeben werden können. (BILDER!)

# 4 Setup
## 4.1 Hardware
Zur Realisierung des Projektes wurde ein Arduino Nano 33 BLE Sense verwendet.
Dieser weist eine Reihe von Sensoren auf, unter anderem der von uns benutzte Farbsensor.
Außerdem verwendeten wir noch einen Laptop für das Programmieren und die Simulation des Smartphones
## 4.2 Software
Die Programme wurden wie bereits erwähnt in verschiedenen Programmiersprachen geschrieben.

Die Webapp zur Simulation des Smartphones beinhaltet React.js und somit JavaScript, CSS und HTML. Es wurden weiterhin die Pakete Primereact[5] für Designkomponenten und react-router-dom für die Erstellung der WebApp als Single Page Application[6] verwendet. Die Komponenten wurden unter Verwendung der jeweiligen Dokumentationen der Bibliotheken erstellt.[7] Die beiden Python-Programme wurden entsprechend mit Python und den Bibliotheken serial, json und csv ... erstellt

Der Code für den Arduino wurde in der Arduino IDE in C geschrieben.
Zusätzlich wurde das vorher trainierte Model in Python entwickelt.

# 5 Projektergebnisse
Screenshots der App (rot, grün, gelb) + wie lange alles dauert? + wie akkurat es tatsächlich ist


# 6 Troubleshooting
## 6.1 Microcontroller
Für das vorherige Messgerät stellte sich heraus das der Arduino scheinbar nicht in der Lage war das Gerät zu betreiben.
Nachdem Wir dann einige Arduinos ausprobiert haben, entschieden wir uns für einen mit 5V Output.

## 6.2 Messgeräte
Zu Beginn hatten wir ein Messgerät verwendet.
Dieses erwies sich allerdings nach vielem Testen als fehlerhaft.
Der Fehler bestand darin, dass das Gerät nur einen Wert dauerhaft ausgegeben hat.

-Benutzeranleitung nur in Chinesisch und für bauähnliche Geräte
-Benutzeranleitung nicht mitgeliefert

## 6.3 Librarys
Bei dem Arduino BLE 33 Sense mussten wir feststellen, dass für unseren vorherigen Plan leider keine Kompatibilität zu den Librarys bestand.
Wir haben also durch die Inkompatiblen Librarys unsere USB Ports überschrieben wodurch der Arduino die Kommunikation mit dem PC verloren hat.
Dadurch war dieser nicht mehr zu gebrauchen.

## 6.4 Dateiformate
- viele verschiedene Dateiformate welche die Übersetzung und Kommunikation erschweren

# 7 Lessons Learned
## 7.1 Farberkennung
## 7.2

# Quellen
[1] ECENSE-Store (2018, 27. März). *ECENCE pH Teststreifen 100 Stck, Lackmus Testpapier, Messbereich 4,5-9, Indikator Universalpapier, Säuretest für Aquarien, Trinkwasser.* URL: https://www.amazon.de/dp/B07CCZSV6C/ref=twister_B095SV65FG?_encoding=UTF8&psc=1 (abgerufen am 24.06.2023)
[2] Jeske, E. (2023, 17. April). *pH-Wert Pflanzen-Tabelle: Der richtige Boden für deine Pflanze.* URL: https://liebe-zum-garten.de/ph-wert-pflanzen-tabelle/ (abgerufen am 12.06.2023)
[3] vgl. Kumar, P. (2022, 22. Januar). *Convert CSV to JSON Using Python – A Beginner’s Guide.* URL: https://www.askpython.com/python/examples/convert-csv-to-json (abgerufen am 18.06.2023)
[4] vgl. OpenAI (2023, 03. Juli). Antwort auf die Frage: *Wie könnte ein Python Programm aussehen, dass auf COM10 hört und alle Daten, die dort eingehen, über einen Websocket Server abrufbrar machen*
[5] Bib primereact
[6] Bib react-router-dom
[7] Doc primereact
