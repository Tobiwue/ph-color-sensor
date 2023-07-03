# PH-Color-Sensor Methoden der Wissensverarbeitung SoSe23 - HTW Berlin FB4 MSC

# 1 Einführung
## 1.1 Motivation
Im Rahmen des Moduls 'Wissensmanagement' im Wirtschaftsinformatik Masterstudium an der HTW-Berlin hatten wir die Aufgabe, ein Open Source Projekt umzusetzen.
Durch gemeinsame Ideenfindung haben wir uns für PH-Wert Messungen entschieden.
Zusätzlich haben wir uns darauf festgelegt, dass wir diese Messungen an Bodenproben durchführen möchten um Pflanzen die perfekte Grundlage zum Wachsen bieten zu können.

## 1.2 Zielsetzung
Durch ein Messgerät welches mit einem Arduino gekoppelt ist, soll der PH Wert gemessen und mit einer Datenbank abgeglichen werden.
Anschließend erfolgt der Abgleich mit der Datenbank. Der Benutzer bekommt nun das Feedback ob seine Pflanze den perfekten Boden hat.
Das Feedback soll in einem simulierten Smartphone zurückgegeben werden.

## 1.3 Vorgehensweise
Zuerst wurden verschiedene Messungsmöglichkeiten betrachtet.
In Rücksprache mit den Dozenten haben wir ein Messgerät erhalten, welches wir mit einem Arduino verbinden konnten.
Dieses Messgerät erwies sich nach ausgiebigen Versuchen als Fehlerhaft.
Nachdem wir ca. 80% unserer Zeit mit diesem Messgerät verbracht haben, entschieden wir uns für eine andere Alternative.
Mittels des eingebauten Farbsensors in dem Arduino, werten wir nun Farben aus welche PH-Teststreifen zurückgeben.
Damit sind wir in der Lage durch bestimmte Farben festzulegen, welcher PH Wert unsere Erdprobe nachweist.
Der Arduino wird hierbei mittels Machine Learning darauf trainiert bei verschiedenen Inputs den passenden Output zu liefern.

# 2 Daten

## 2.1 Datenbeschaffung Farben
Zuerst haben wir uns eine Packung mit Messstreifen gekauft.
Auf dieser Packung sind die Farben verschiedenen PH Werten zugewiesen.
Im Anschluss haben wir die Farben digitalisiert und mit dem Arduino ausgelesen.
Wir lassen den Arduino vorher die verschiedenen Farben Messen und verwenden dann diese Messungen als Basis für die Auswertung.

## 2.2 Datenbeschaffung PH Werte
Durch Recherche sind wir auf eine große bestehende Datenbank gestoßen.
Diese beinhaltet schon viele Werte welchen gängigen Pflanzen zugeordnet wurden.
Allerdings waren die Werte in einer Website als Text eingebettet, daher mussten wir die Werte erst scrapen und in eine eigene .csv überführen.

# 3 Konzept
Für das Projekt haben wir ein Konzept erstellt welches verschiedene Komponenten und die Kommunikation zwischen ihnen beinhaltet.
Folgende Abbildung stellt dies einmal Schematisch dar:

# 4 Setup
## 4.1 Hardware
Zur Realisierung des Projektes wurde ein Arduino Nano 33 BLE Sense verwendet.
Dieser weist eine Reihe von Sensoren auf, unter andrem der von uns benutzte Farbsensor.

## 4.2 Software
Das Programm wurde in verschiedenen Programmiersprachen geschrieben.
Die Webapp zur Simulation des Smartphones beinhaltet:
JavaScript, PHP und CSS

Der Code für den Arduino wurde in der Arduino IDE in C geschrieben.
Zusätzlich wurde das vorher trainierte Model in Python entwickelt.

# 5 Projektergebnisse
## 5.1
## 5.2

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
