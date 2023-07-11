# PH-Color-Sensor - Methoden der Wissensverarbeitung SoSe23 - HTW Berlin FB4 M.Sc

# 1 Einführung
## 1.1 Motivation
Im Rahmen des Moduls 'Wissensmanagement' im Wirtschaftsinformatik Masterstudium an der HTW-Berlin bestand die Aufgabe, ein Projekt umzusetzen, in welchem die Themen Open-Source Hardware, Machine Learning oder Internet of Things behandelt werden. Durch gemeinsame Ideenfindung wurde sich für die Umsetzung eines PH-Wert-Messgeräts entschieden.
Zusätzlich wurde sich darauf festgelegt, diese Messungen an Bodenproben durchzuführen, um Pflanzen die perfekte Grundlage zum Wachsen bieten zu können.

## 1.2 Zielsetzung
Durch ein Messgerät welches mit einem Arduino gekoppelt ist, soll der PH Wert gemessen und mit einem in einer Datenbank hinterlegtem Idealwert abgeglichen werden. Der Benutzer bekommt daraufhin das Feedback, wie sich der PH-Wert des Bodens seiner Pflanze. Aufgrund des Feedbacks weis der Benutzer dann ob Handlungsbedarf besteht. Dieses Feedback soll in einem simulierten Smartphone zurückgegeben werden.

## 1.3 Vorgehensweise
Zuerst wurden verschiedene Messungsmöglichkeiten betrachtet. In Rücksprache mit den Dozenten wurde ein Messgerät genutzt, welches mit einem Arduino (welcher? nicht der Sense) verbunden werden konnte. Dieses Messgerät erwies sich nach ausgiebigen Versuchen jedoch als fehlerhaft. Nachdem ein Großteil der Bearbeitungszeit damit verbracht wurde, hinreichende Daten durch das Messgerät zu erhalten, was leider nicht möglich war, wurde sich entschieden, die ursprüngliche Projektidee anzupassen. Mittels des eingebauten Farbsensors in dem Arduino Sense 33 BLE werden nun Farben ausgewertet, welche analoge PH-Teststreifen jeweils zurückgeben. Damit ist es möglich, durch bestimmte Farben festzustellen, welcher PH Wert die jeweilige Erdprobe nachweist. Der Arduino wird hierbei mittels Machine Learning darauf trainiert, bei verschiedenen Inputs den passenden Output zu liefern.

Parallel dazu wurde eine WebApp erstellt, in welcher aufbereitete Daten zu den idealen PH-Werten für verschiedene Pflanzen mit gemessenen Werten verglichen werden können. Weiterhin wurde eine Lösung implementiert, mit welcher die gemessenen Daten des Farbsensors auf dem Arduino in der App genutzt werden können. 

# 2 Daten

## 2.1 Datenbeschaffung Farben
Znächst wurden analoge PH-Teststreifen, die Werte im Bereich von 4,5 bis 9 auslesen können, gekauft.[^1] Es wurde sich für diese PH-Streifen entschieden, da sie einen realistischen Wertebereich umfassen und feingradiger sind, als PH-Streifen, die das gesamte Spektrum erfassen können sollen. Auf der Verpackung der PH-Streifen sind unterschiedliche Farben verschiedenen PH-Werten zugewiesen. Mithilfe eines Python-Programmes (QUELLE) konnte ein Modell trainiert werden, das über den Arduino Farbsensor die entsprechende Farbe erkennt und einem PH-Wert zuordnet. Dabei wurden als Trainings- und Testdaten die Messungen der möglichen Werte auf der Verpackung der Teststreifen verwendet. 

## 2.2 Datenbeschaffung idealer PH-Werte

Die idealen pH-Werte für verschiedene Pflanzen wurden von einer Webseite entnommen, die speziell für (Hobby-)Gärtner Informationen zu diesem Thema bereitstellt[^2]. Die dort verfügbaren Daten sind gruppiert nach Kategorien und enthalten jeweils einen Bereich für den idealen pH-Wert jeder Pflanze. Um diese Daten in der Webanwendung nutzbar zu machen, wurden sie zunächst aus der Webseite kopiert und in Microsoft Excel importiert. Dort wurden die pH-Wert-Bereiche getrennt, um Minimal- und Maximalwerte zu erhalten, und anschließend als CSV-Datei gespeichert. Diese CSV-Datei wurde dann mithilfe eines Python-Programms in das JSON-Dateiformat konvertiert[^3]. Nach der Ausführung des Programms wurden die einzelnen Werte manuell den entsprechenden Kategorien zugeordnet und die vollständige Datei im Verzeichnis der Webanwendung gespeichert.

# 3 Konzept und Realisierung
Für das Projekt wurde ein Konzept erstellt, welches verschiedene Komponenten und die Kommunikation zwischen ihnen beinhaltet. Folgende Abbildung stellt dies schematisch dar:

![Konzept Funktionsweise PH_Messgeräts und Ausgabe-WebApp](https://github.com/Tobiwue/ph-color-sensor/blob/pictures/Konzept_PH_Messer.png?raw=true)

Demnach muss zunächst der PH-Teststreifen verwendet werden, um den PH-Wert des Bodens einer Pflanze zu messen. Daraufhin wird dieser Streifen über den Farbsensor des Arduinos gehalten, sodass die Farbe erkannt werden kann. Durch eine Verbindung über ein USB-Kabel zwischen dem Arduino und einem Notebook, wobei bei dem Notebook der USB-Port COM10 verwendet werden muss, können die gemessenen Daten ausgetauscht werden. Auf dem Notebook läuft ein weiteres Python-Programm, welches auf den Port COM10 hört und alle eingehenden Werte in eine Datei schreibt, wobei stets der neuste Wert den jeweils älteren überschreibt[^4].

Weiterhin läuft auf dem PC ein React-Programm, dass über den Localhost und Port 3000 eine WebApp bereitstellt, die in Chrome als Smartphone-App simuliert werden kann. In dieser gibt es zwei primäre Ansichten. Zum einen eine Übersicht aller idealen PH-Werte, zum anderen eine Auswahl, bei welcher die Pflanze ausgewählt werden kann, für die der PH-Wert gemessen wurde. Nach dieser Auswahl und dem klick auf dem Button *auswählen* wird der gemessene Wert aus der Datei *gemessen.json* mit den idealwerten verglichen, sodass ggf. entsprechende Handlungsbedarfe angegeben werden können.

# 4 Setup
## 4.1 Hardware
Zur Realisierung des Projektes wurde ein Arduino Nano 33 BLE Sense verwendet.
Dieser weist eine Reihe von Sensoren auf, unter anderem der von uns benutzte Farbsensor.
Außerdem verwendeten wir noch einen Laptop für das Programmieren und die Simulation des Smartphones

## 4.2 Software
Die Programme wurden wie bereits erwähnt in verschiedenen Programmiersprachen geschrieben.

Die Webapp zur Simulation des Smartphones beinhaltet *React.js* und somit JavaScript, CSS und HTML. Es wurden weiterhin die Pakete *PrimeReact* für Designkomponenten[^5] [^6] [^7] [^8] [^9] [^10] [^11] und *react-router-dom* für die Erstellung der WebApp als Single Page Application[^12] [^13] verwendet. 

Die React-App besteht aus verschiedenen Komponenten, die für die Erstellung einer React-Webanwendung typisch sind. In der Datei *App.js* werden zunächst die URLs definiert, über die verschiedene Ansichten erreichbar sein sollen. Diese Datei wird dann in *index.js* aufgerufen, um die App zu erzeugen.

Die Komponenten *Pflanzen_Ansicht.js*, *Pflanzen_Uebersicht.js* und *Pflanzen_Auswahl.js* enthalten jeweils die Komponenten und Logik für die zugehörigen Ansichten. In *Pflanzen_Uebersicht.js* gibt es beispielsweise eine Tabelle, in der alle Idealwerte aus der Datei *pflanzen_data.json* dargestellt werden. In *Pflanzen_Auswahl.js* befindet sich ein Dropdown-Menü, mit dem eine Pflanzenart aus den Daten ausgewählt und über einen entsprechenden Button abgesendet werden kann. Dadurch kann in *Pflanzen_Ansicht.js* die Bewertung in Textform ausgegeben werden.

Mithilfe eines Seitenmenüs können die verschiedenen Ansichten angesteuert werden, und das App-Logo führt ebenfalls zur Auswahl-Seite zurück, da diese als Startseite der Anwendung verwendet wird, um eine einfache Bedienung zu ermöglichen.

Der Code für den Arduino wurde in der Arduino IDE in C geschrieben.
Zusätzlich wurde das vorher trainierte Model in Python entwickelt.

# 5 Projektergebnisse
Die Screenshots der App zeigen die Darstellung von Hinweisen für verschiedene PH-Wert-Bereiche. Wenn die App eine Eingabe zur Auswahl der Pflanzenart erhält und diese ausgewertet werden soll, wird anhand der idealen PH-Werte für die jeweilige Pflanzenart berechnet, ob der gemessene Wert sich im Idealbereich befindet oder nicht. Wenn der Wert im Idealbereich liegt, wird ein grüner Hinweis angezeigt. Wenn der PH-Wert innerhalb von &plusmn;0,5 des Idealintervalls liegt, wird im gelben Fenster darauf hingewiesen, dass leichte Anpassungen erforderlich sein könnten. Wenn der Wert außerhalb dieses erweiterten Intervalls liegt, besteht ein größerer Handlungsbedarf, der rot gekennzeichnet ist. Damit die Nutzerinnen und Nutzer sofort erfahren, welche Schritte zur Verbesserung der PH-Werte führen können, werden entsprechende Handlungsempfehlungen angezeigt. Folgende Screenshots der App zeigen die Darstellung der Hinweisen für verschiedene PH-Wert-Bereich:

<p align="middle">
<img src="https://github.com/Tobiwue/ph-color-sensor/blob/pictures/PH_grün.PNG" width="300">
<img src="https://github.com/Tobiwue/ph-color-sensor/blob/pictures/PH_gelb.PNG" width="300">
<img src="https://github.com/Tobiwue/ph-color-sensor/blob/pictures/PH_rot.PNG" width="300">
</p>

Die Dauer des gesamten Prozesses hängt von verschiedenen Faktoren ab, darunter die Reaktionszeit der App und die Geschwindigkeit der Datenverarbeitung. Obwohl keine großen Datenmengen verarbeitet werden müssen, wurde bewusst ein Ladesymbol implementiert, das für eine bestimmte Zeit von drei Sekunden angezeigt wird, bevor die Ergebnisseite geladen wird. Diese Entscheidung wurde getroffen, um sicherzustellen, dass während dieser Zeit der pH-Streifen klar über den Sensor gehalten werden kann und der Farbwert so genau wie möglich ermittelt werden kann. Indem eine angemessene Wartezeit eingerichtet wird, wird ermöglicht, dass die Datenverarbeitung abgeschlossen wird und genügend Zeit für eine genaue Auswertung der PH-Werte zur Verfügung steht.

Die App ist ................ akkurat?


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

## 6.4 Dateiformate und -übertragung
Für die Integration der vom Arduino erfassten Sensordaten in die Webanwendung waren verschiedene Aspekte zu berücksichtigen, darunter der Übertragungsweg und das Datenformat. Eine anfängliche Idee bestand darin, die Daten an einen Server zu senden, z. B. einen lokalen Express-Server von Node.js. Allerdings stellte sich die Umsetzung dieser Lösung als schwierig heraus. Die Applikation wurde zwar ebenso über den lokalen Server gehostet, das Grundgerüst der navigierung zwischen den verschiedenen Ansichten und der Datenübertragung innerhalb der Applikation erfolgte über Funktionen des Pakets *react-router-dom*, welche nicht mehr nutzbar waren, da sie über URLs ihre Funktionalität erfüllt hatten. Da der Server selbst über URLs arbeitete, beispielsweise für POST- oder GET-Anfragen, konnte er die Navigations-URLs nicht auflösen. Angesichts der begrenzten verfügbaren Zeit wurde daher eine alternative Lösung in Betracht gezogen.

Da die Datenübertragung auch über eine kabelgebundene Verbindung wie ein USB-Kabel erfolgen kann, das mit einem Laptop verbunden ist, können die Daten in entsprechenden Programmen verwendet werden. Gängige Programme dafür sind beispielsweise die Arduino IDE^[14] oder PuTTY[^15].

Des Weiteren mussten die Daten zu den idealen pH-Werten von der Website in einem Format vorliegen, das von der Webanwendung verarbeitet werden kann. Eine Möglichkeit bestand darin, eine kleine Datenbank einzurichten, aus der die Daten abgefragt werden könnten. Die Datenmenge ist jedoch relativ gering und es werden keine großen Veränderungen oder Erweiterungen erwartet, da alle gängigen Pflanzenarten enthalten sind, die für Hobbygärtner, für die diese Anwendung entwickelt wurde, relevant sein könnten. Somit wurde entschieden, die Daten in einer JSON-Datei abzulegen, die von der React-Applikation ohne großen Aufwand genutzt werden kann. Die Konvertierung der Tabellendaten in ein geeignetes Format wie CSV und schließlich in eine gewünschte JSON-Dateistruktur stellte jedoch eine unerwartete Hürde dar, die mehrere Stunden Arbeit erforderte, um sie zu überwinden.

# 7 Lessons Learned

# 8 Ausblick
Der wichtigste nächste Schritt besteht darin, eine vollständige und korrekte Implementierung des pH-Messgeräts zu erreichen. Da der Erfolg dieses Vorhabens jedoch von der fehlerfreien Funktionsweise des pH-Sensors abhängt, ist nur begrenzt Einfluss auf den Erfolg möglich.

In einer idealen Anwendung könnten zusätzlich zu den Überprüfungen der aktuellen pH-Messwerte auch vergangene Messwerte gespeichert werden, um einen Verlauf einsehbar zu machen. Darüber hinaus könnte eine Funktion implementiert werden, um eigene Pflanzenprofile zu speichern, möglicherweise inklusive eigener aufgenommener Bilder. Das Hosting der Anwendung ermöglicht es verschiedenen Personen, sie zu nutzen und innerhalb der Community Wissen auszutauschen, beispielsweise durch die Integration von Forum-Funktionen. Dies wäre eine positive Weiterentwicklung der Anwendung. 

# Quellen

[^1]: ECENSE-Store (2018, 27. März). *ECENCE pH Teststreifen 100 Stck, Lackmus Testpapier, Messbereich 4,5-9, Indikator Universalpapier, Säuretest für Aquarien, Trinkwasser.* URL: https://www.amazon.de/dp/B07CCZSV6C/ref=twister_B095SV65FG?_encoding=UTF8&psc=1 (abgerufen am 24.06.2023)

[^2]: Jeske, E. (2023, 17. April). *pH-Wert Pflanzen-Tabelle: Der richtige Boden für deine Pflanze.* URL: https://liebe-zum-garten.de/ph-wert-pflanzen-tabelle/ (abgerufen am 12.06.2023)

[^3]: Kumar, P. (2022, 22. Januar). *Convert CSV to JSON Using Python – A Beginner’s Guide.* URL: https://www.askpython.com/python/examples/convert-csv-to-json (abgerufen am 18.06.2023)

[^4]: OpenAI (2023, 03. Juli). Abwandlung der Antwort auf die Frage: *Wie könnte ein Python Programm aussehen, dass auf COM10 hört und alle Daten, die dort eingehen, über einen Websocket Server abrufbrar macht.*

[^5]: PrimeReact (o.D.). *Button.* URL: https://primereact.org/button/ (abgerufen am 19.06.2023)

[^6]: PrimeReact (o.D.). *Card.* URL: https://primereact.org/card/ (abgerufen am 26.06.2023)

[^7]: PrimeReact (o.D.). *DataTable.* URL: https://primereact.org/datatable/ (abgerufen am 19.06.2023)

[^8]: PrimeReact (o.D.). *DropDown.* URL: https://primereact.org/dropdown/ (abgerufen am 19.06.2023

[^9]: PrimeReact (o.D.). *Menu.* URL: https://primereact.org/menu/ (abgerufen am 19.06.2023)

[^10]: PrimeReact (o.D.). *ProgressSpinner.* URL: https://primereact.org/progressspinner/ (abgerufen am 03.07.2023) 

[^11]: PrimeReact (o.D.). *SideBar.* URL: https://primereact.org/sidebar/ (abgerufen am 19.06.2023)

[^12]: React Router (o.D.). *useNavigate.* URL: https://reactrouter.com/en/main/hooks/use-navigate (abgerufen am 26.06.2023)

[^13]: React Router (o.D.). *useLocation.* URL: https://reactrouter.com/en/main/hooks/use-location (abgerufen am 26.06.2023)

[^14]: Arduino (o.D.). *SerialTransfer.* URL: https://www.arduino.cc/reference/en/libraries/serialtransfer/ (abgerufen am 03.07.2023)

[^15]: Mechatrofice (o.D.). *Save Serial data to a text file – Arduino, Processing, PuTTY.* URL: https://mechatrofice.com/arduino/save-serial-data-to-a-text-file-arduino-processing-putty (abgerufen am 03.07.2023)
