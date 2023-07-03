# PH-Color-Sensor Methoden der Wissensverarbeitung SoSe23 - HTW Berlin FB4 MSC

# 1 Einführung
## 1.1 Motivation
Im Rahmen des Moduls 'Wissensmanagement' im Wirtschaftsinformatik Masterstudium an der HTW-Berlin hatten wir die Aufgabe, ein Open Source Projekt umzusetzen.
Durch gemeinsame Ideenfindung haben wir uns für PH-Wert Messungen entschieden.
Zusätzlich haben wir uns darauf festgelegt, dass wir diese Messungen an Bodenproben durchführen möchten um Pflanzen die perfekte Grundlage zum wachsen bieten zu können.

## 1.2 Zielsetzung
Durch ein Messgerät welches mit einem Arduino gekoppelt ist, soll der PH Wert gemessen und mit einer Datenbank abgeglichen werden.
Durch den abgleich mit der Datenbank, bekommt der Benutzer das Feedback ob seine Pflanze den perfekten Boden hat.
Das Feedback soll in einem simulierten Smartphone zurück gegeben werden.

## 1.3 Vorgehensweise
Zuerst wurden verschiedene Messungsmöglichkeiten betrachtet.
In Rücksprache mit den Dozenten haben wir ein Messgerät erhalten, welches wir mit einem Arduiono verbinden konnten.
Dieses Messgerät erwies sich nach ausgiebigen Versuchen als Fehlerhaft.
Nachdem wir ca. 80% unserer Zeit mit diesem Messgerät verbracht haben, entschieden wir uns für eine andere Alternative.
Mittels des eingebauten Farbsensors in dem Arduino, werten wir nun Farben aus welche PH-Teststreifen zurück geben.
Damit sind wir in der Lage durch bestimmte Farben festzulegen, welcher PH Wert unsere Erdprobe nachweist.
Der Arduino wird hierbei mittels Machinelearning darauf Trainiert bei verschiedenen Inputs den passenden Output zu liefern.

# 2 Daten
## 2.1 Datenbeschaffung Farben
Zuerst haben wir uns eine Packung mit Messstreifen gekauft.
Auf dieser Packung sind die Farben verscheidenen PH Werten zugewiesen.
Im Anschluss haben wir die Farben digitalisiert und mit dem Arduiono ausgelesen.
Wir lassen den Arduino vorher die verschiedenen Farben Messen und verwenden dann diese Messungen als Basis für die Auswertung

## 2.2 Datenbeschaffung PH Werte
Durch Recherche sind wir auf eine große bestehende Datenbank gestoßen.
Diese beinhaltet schon viele Werte welchen gängigen Pflanzen zugeordnet wurden.
Da Diese allerdings in einer Website als Text eingebettet war, mussten wir die Werte erst scrapen und in eine eigene .csv überführen.

# 3 Konzept
Für das Projekt haben wir ein Konzept erstellt welches verschiedene Komponenten und die Kommunikation zwischen ihnen beinhaltet.
Folgende Abbildung stellt dies einmal Schematisch dar:

# 4 Setup
## 4.1 Hardware
-Microcontroller
-Messwerkzeuge

## 4.2 Software
- Arduino
- programmiert {Sprachen}
- Smartphonesimulation auf Web basis
- programmiert {Sprachen}
# 5 Projektergebnisse

# 6 Troubleshooting
## 6.1 Microcontroller
-unterschiedliche Spannung
-unterschiedliche Prozessoren
## 6.2 Messgeräte
-Fehlerhafte Messgerät
-Benutzeranleitung nur in chinesisch und für bauähnliche Geräte
-Benutzeranleitung nicht mitgelifert
## 6.3 Librarys
- überschreibung von GPIO Header durch nicht Kompatibilität mit dem Arduino
## 6.4 Dateiformate
- viele verschiedene Dateiformate welche die übersetzung und Kommunikation erschweren

# 7 Lessons Learned
## 7.1
## 7.2
