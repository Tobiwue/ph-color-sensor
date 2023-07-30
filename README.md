# PH-Color-Sensor - Methoden der Wissensverarbeitung SoSe23 - HTW Berlin FB4 M.Sc

# 1 Einführung
## 1.1 Motivation
Im Rahmen des Moduls 'Methoden der Wissensverarbeitung' im Wirtschaftsinformatik Masterstudium an der HTW-Berlin bestand die Aufgabe, ein Projekt umzusetzen, in welchem die Themen Open-Source-Hardware, Machine Learning oder Internet of Things behandelt werden. Durch gemeinsame Ideenfindung wurde sich für die Umsetzung eines pH-Wert-Messgeräts entschieden.
Zusätzlich wurde sich darauf festgelegt, diese Messungen an Bodenproben durchzuführen, um Pflanzen die perfekte Grundlage zum Wachsen bieten zu können.

## 1.2 Zielsetzung
Durch ein Messgerät, welches mit einem Arduino gekoppelt ist, soll der PH-Wert einer Bodenprobe gemessen und mit einem in einer Datenbank hinterlegten Idealwert abgeglichen werden können. Der Benutzer bekommt daraufhin das Feedback, wie der PH-Wert des Bodens der Pflanze ist, beispielsweise zu sauer oder zu baisch. Aufgrund des Feedbacks weiß der Benutzer dann, ob Handlungsbedarf besteht. Dieses Feedback soll in einer simulierten Web-App zurückgegeben werden. Ziel ist dabei zu prüfen, ob der Farbsensor so akkurat ist, dass er für diesen Zweck verwendet werden kann.

## 1.3 Vorgehensweise
Zuerst wurden verschiedene Messungsmöglichkeiten betrachtet. In Rücksprache mit den Dozenten wurde ein Messgerät genutzt, welches mit einem Arduino Nano Every verbunden werden konnte. Dieses Messgerät erwies sich nach ausgiebigen Versuchen jedoch als fehlerhaft. Nachdem ein Großteil der Bearbeitungszeit damit verbracht wurde, hinreichende Daten durch das Messgerät zu erhalten, was leider nicht möglich war, wurde sich entschieden, die ursprüngliche Projektidee anzupassen. Mittels des eingebauten Farbsensors in dem Arduino Sense 33 BLE werden nun Farben ausgewertet, welche analoge PH-Teststreifen jeweils zurückgeben. Damit ist es möglich, durch bestimmte Farben festzustellen, welcher PH Wert die jeweilige Erdprobe nachweist. Der Arduino wird hierbei mittels Machine Learning darauf trainiert, bei verschiedenen Inputs den passenden Output zu liefern.

Parallel dazu wurde eine WebApp erstellt, in welcher aufbereitete Daten zu den idealen PH-Werten für verschiedene Pflanzen mit gemessenen Werten verglichen werden können. Weiterhin wurde eine Lösung implementiert, mit welcher die gemessenen Daten des Farbsensors auf dem Arduino in der App genutzt werden können. 

# 2 Daten

## 2.1 Datenbeschaffung Farben
Zunächst wurden analoge PH-Teststreifen, die Werte im Bereich von 4,5 bis 9 auslesen können, gekauft.[^1] Es wurde sich für diese PH-Streifen entschieden, da sie einen realistischen Wertebereich umfassen und feingradiger sind als PH-Streifen, die das gesamte Spektrum erfassen können. Auf der Verpackung der PH-Streifen sind unterschiedliche Farben verschiedenen PH-Werten zugewiesen. Mithilfe eines bereits bestehenden Python-Programmes[^2] konnte ein Modell trainiert werden, das über den Arduino Farbsensor die entsprechende Farbe erkennt und einem PH-Wert zuordnet. Dabei wurden als Trainings- und Testdaten die Messungen der möglichen Werte auf der Verpackung der Teststreifen verwendet. 

## 2.2 Datenbeschaffung idealer PH-Werte

Die idealen pH-Werte für verschiedene Pflanzen wurden von einer Webseite entnommen, die speziell für (Hobby-)Gärtner Informationen zu diesem Thema bereitstellt[^3]. Die dort verfügbaren Daten sind gruppiert nach Kategorien und enthalten jeweils einen Bereich für den idealen PH-Wert jeder Pflanze. Um diese Daten in der Webanwendung nutzbar zu machen, wurden sie zunächst aus der Webseite kopiert und in Microsoft Excel importiert. Dort wurden die PH-Wert-Bereiche getrennt, um Minimal- und Maximalwerte zu erhalten, und anschließend in einer CSV-Datei gespeichert *(csv_ideal_ph.csv)*. Diese CSV-Datei wurde daraufhin mithilfe eines Python-Programms in das JSON-Dateiformat konvertiert *(ph_ideal_csv_to_json.py)*[^4]. Nach der Ausführung des Programms wurden die einzelnen Werte manuell den entsprechenden Kategorien zugeordnet und die vollständige Datei im Verzeichnis der Webanwendung gespeichert. Diese kann somit aufbereitet diesem Repository entnommen werden *(pflanzen_data.json* in Branch *webApp*, in Ordner *src)*. 

# 3 Konzept und Realisierung
Für das Projekt wurde ein Konzept erstellt, welches verschiedene Komponenten und die Kommunikation zwischen ihnen beinhaltet. Folgende Abbildung stellt dies schematisch dar:

![Konzept Funktionsweise PH_Messgeräts und Ausgabe-WebApp](https://github.com/Tobiwue/ph-color-sensor/blob/main/Konzept_PH_Messer.png?raw=true)

Demnach muss zunächst der PH-Teststreifen verwendet werden, um den PH-Wert des Bodens einer Pflanze zu messen. Daraufhin wird dieser Streifen über den Farbsensor des Arduinos gehalten, sodass die Farbe erkannt werden kann. Durch die Verbindung über ein USB-Kabel zwischen dem Arduino und einem Notebook, können die gemessenen Daten ausgetauscht werden. Auf dem Notebook läuft ein Python-Programm, welches auf den Port COM10 hört und alle eingehenden Werte in eine Datei schreibt, wobei stets der neuste Wert den jeweils älteren überschreibt *(Listen_to_port_Com10.py)*[^5].

Weiterhin läuft auf dem PC ein React-Programm, dass über den Localhost und Port 3000 eine WebApp bereitstellt, die in Chrome als Smartphone-App simuliert werden kann (Branch *webApp*). In dieser gibt es zwei primäre Ansichten. Zum einen eine Übersicht aller idealen PH-Werte durch eine Datenbank, zum anderen eine Auswahl, bei welcher die Pflanze ausgewählt werden kann, für die der PH-Wert gemessen wurde. Nach dieser Auswahl und dem Klick auf den Button *auswählen* wird der gemessene Wert aus der Datei *gemessen.json* mit den Idealwerten verglichen, sodass ggf. entsprechende Handlungsbedarfe angegeben werden können.

# 4 Setup
## 4.1 Hardware
Zur Realisierung des Projektes wurde ein Arduino Nano 33 BLE Sense verwendet. Dieser weist eine Reihe von Sensoren auf, unter anderem der verwendete Farbsensor. Außerdem wurde ein Notebook für das Programmieren und die Simulation des Smartphones verwendet und ein USB-Kabel für die Datenübertragung von dem Arduino zu dem Notebook. 

Weiterhin wurden die PH-Teststreifen samt ihrer Verpackung für das Erstellen des Modells und Testen der Anwendung verwendet.

## 4.2 Software
### 4.2.1 Arduino
Die Programme wurden wie bereits erwähnt in verschiedenen Programmiersprachen geschrieben.

Für die Datenaufnahme der PH-Farbwerte wurde das Programm *object_color_capture.ino*[^2] verwendet. Mithilfe dieser Anwendung und der Arduino Cloud, konnte die Farbskala der PH-Wert-Messstreifen aufgenommen werden. Dafür wurde von den verschiedenen Farben ein Foto gemacht und anschließend auf dem Notebook in Großformat ausgegeben. Dann wurde der Farbsensor über die gesamte Fläche des Bildes gehalten, um eine möglichst große Datenmenge zu erhalten. Die auf dem Serial Monitor ausgegebenen RGB Werte wurden in eine csv Datei übertragen, um diese späte durch ein neuronales Netzwerk zu verwerten.

Für die Datenaufbereitung wurde die *FruitToEmoji* Google Colaboratory Seite[^6] verwendet. Auf der Google Colaboratory Seite konnten die vorher erstellten csv Dateien hochgeladen und aufbereitet werden. Dabei werden eventuelle *NULL* Werte entfernt und die Menge an Daten wird für die einzelnen Skalenwerte gespeichert. Außerdem werden die Werte randomisiert, um den Lerneffekt der später verwendeten API zu verstärken. 

Die nun aufbereiteten Daten können daraufhin verarbeitet werden und in ein, durch den Arduino auslesbares, Model geschrieben werden[^7]. Dafür wurde die Epochen-Anzahl auf 600 und die Batchzahl auf 10 erhöht, um ein opimales Ergebnis zu erreichen. Durchschnittlich wurde mit ~500 Werten pro CSV Datei gearbeitet. 

Anschließend kann nun das Model getestet und als Plot ausgegeben werden, dies wird auch in der Google Colaboratory Seite getan.
Danach kann das trainierte Model in ein Tensorflow Lite Format konvertiert werden, damit der Arduino und die Software zum Auswerten der Analysierten PH Werte mit den Daten arbeiten kann. Und zum Schluss muss nur noch ein Arduino Header aus dem Model generiert werde. Dies kann auch mit der Google Colaboratory Seite erstellt werden.

Nun konnte die *object_color_classify.ino*[^2] angepasst und auf den Arduino geladen werden. Da zwischenzeitlich einige Librarys des TensorflowLite den Ordnerpfad geändert haben und Namen teilweise auch verändert wurden, musste die *object_color_classify.ino* dahingehend angepasst werden. Außerdem mussten die nun neu hinzugefügten Ergebnisse, das ursprüngliche Programm war nur für den Vergleich zwischen drei Farben ausgelegt, eingepflegt werden und korrekt im Serial Monitor ausgegeben werden.

Der Code für den Arduino wurde in der Arduino IDE in C geschrieben. Zusätzlich wurde das vorher trainierte Model in Python entwickelt.

# 4.2.2 Web-App
Die Web-App zur Simulation des Smartphones beinhaltet *React.js* und somit JavaScript, CSS und HTML. Es wurden weiterhin die Pakete *PrimeReact* für Designkomponenten[^8] [^9] [^10] [^11] [^12] [^13] [^14] und *react-router-dom* für die Erstellung der Web-App als Single Page Application[^15] [^16] verwendet. 

Die React-App besteht aus verschiedenen Komponenten, die für die Erstellung einer React-Webanwendung typisch sind. In der Datei *App.js* werden zunächst die URLs definiert, über die verschiedene Ansichten erreichbar sein sollen. Diese Datei wird dann in *index.js* aufgerufen, um die App zu erzeugen.

Die Komponenten *Pflanzen_Ansicht.js*, *Pflanzen_Uebersicht.js* und *Pflanzen_Auswahl.js* enthalten jeweils die Komponenten und Logik für die zugehörigen Ansichten. In *Pflanzen_Uebersicht.js* gibt es beispielsweise eine Tabelle, in der alle Idealwerte aus der Datei *pflanzen_data.json* dargestellt werden. In *Pflanzen_Auswahl.js* befindet sich ein Dropdown-Menü, mit dem eine Pflanzenart aus den Daten ausgewählt und über einen entsprechenden Button abgesendet werden kann. Dadurch kann in *Pflanzen_Ansicht.js* die Bewertung in Textform ausgegeben werden.

Mithilfe eines Seitenmenüs können die verschiedenen Ansichten angesteuert werden, und das App-Logo führt ebenfalls zur Auswahl-Seite zurück, da diese als Startseite der Anwendung verwendet wird, um eine einfache Bedienung zu ermöglichen.

# 5 Projektergebnisse
Die Screenshots der App zeigen die Darstellung von Hinweisen für verschiedene PH-Wert-Bereiche. Wenn die App eine Eingabe zur Auswahl der Pflanzenart erhält und diese ausgewertet werden soll, wird anhand der idealen PH-Werte für die jeweilige Pflanzenart berechnet, ob sich der gemessene Wert im Idealbereich befindet oder nicht. Wenn der Wert im Idealbereich liegt, wird ein grüner Hinweis angezeigt. Wenn der PH-Wert innerhalb von &plusmn;0,5 des Idealintervalls liegt, wird im gelben Fenster darauf hingewiesen, dass leichte Anpassungen erforderlich sein könnten. Wenn der Wert außerhalb dieses erweiterten Intervalls liegt, besteht ein größerer Handlungsbedarf, der rot gekennzeichnet ist. Damit die Nutzerinnen und Nutzer sofort erfahren, welche Schritte zur Verbesserung der PH-Werte führen können, werden entsprechende Handlungsempfehlungen angezeigt[^17]. Folgende Screenshots der App zeigen die Darstellung der Hinweisen für verschiedene PH-Wert-Bereiche:

<p align="middle">
<img src="https://github.com/Tobiwue/ph-color-sensor/blob/main/PH_grün.PNG" width="300">
<img src="https://github.com/Tobiwue/ph-color-sensor/blob/main/PH_gelb.PNG" width="300">
<img src="https://github.com/Tobiwue/ph-color-sensor/blob/main/PH_rot.PNG" width="300">
</p>

Die Dauer des gesamten Prozesses hängt von verschiedenen Faktoren ab, darunter die Reaktionszeit der App und die Geschwindigkeit der Datenverarbeitung. Obwohl keine großen Datenmengen verarbeitet werden müssen, wurde bewusst ein Ladesymbol implementiert, das für eine bestimmte Zeit von drei Sekunden angezeigt wird, bevor die Ergebnisseite geladen wird. Diese Entscheidung wurde getroffen, um sicherzustellen, dass während dieser Zeit der pH-Streifen klar über den Sensor gehalten werden kann und der Farbwert so genau wie möglich ermittelt werden kann. Indem eine angemessene Wartezeit eingerichtet wird, wird ermöglicht, dass die Datenverarbeitung abgeschlossen wird und genügend Zeit für eine genaue Auswertung der pH-Werte zur Verfügung steht.

Die Farbmessung mit dem Farbsensor des Arduino ist relativ akkurat. Großen Einfluss auf ein einheitlichen akkurates Ergebnis hat dabei, wie einheitlich die Farbe auf dem Teststreifen ist. Ist diese beispielsweise ein wenig verblasst oder befindet sich Erde auf dem Teststreifen, so beeinflusst dies das Testergebnis. Dennoch ist es möglich ein gutes Ergebnis bei der Analyse des PH-Werts zu erzielen. Weiterhin ist zu beachten, dass auch die Farbaufnahmen, die zum Trainieren des Modells einen großen Einfluss auf das Ergebnis haben. Hier wurde durch Vergleichen der Farbergebnisse mit den in Realität existierenden Farben auf der Verpackung der Teststreifen überprüft, dass die Farbwerte so gut wie möglich passend zu den Realwerten sind. 

# 6 Gehäuse - Wearable
Mit der App Shapr3D wurde ein Case entwickelt, welches es ermöglicht den Arduino wie ein Wearable bei sich zu haben. Der Arduino wird in das Gehäuse hineingesteckt und sollte durch die genauen Abmaße fest sitzen. Durch wiederholtes Herausnehmen kann es jedoch zu Materialermüdung kommen, wodurch der Arduino leichter herausrutschen könnte.
Ein kleines Loch am Ende des Cases verwandelt das Gerät in einen Anhänger. Der USB-Port ist frei erreichbar und kann so mühelos mit jedem Gerät verbunden werden.
Das Gehäuse ist allerdings nicht darauf ausgelegt, jede beliebige Dicke an USB Anschlusskabeln zu unterstützen. Außerdem besitzt das Gehäuse keine IP67 Zertifizierung.
Alternativ könnte noch eine Art Deckel entworfen werden, mit einem Vergrößerungsglas oberhalb des Sensors.

<p align="middle">
<img src="https://github.com/Tobiwue/ph-color-sensor/blob/main/arduino wearable.jpg" width="300">
</p>

# 7 Troubleshooting
## 7.1 Microcontroller
Für das vorherige Messgerät stellte sich heraus, dass der verwendete Arduino nicht in der Lage war, dieses Gerät zu betreiben. Nachdem daraufhin einige Arduinos ausprobiert wurden, wurde entschieden, einen Arduino-Microcontroller mit 5V Output zu verwenden.

## 7.2 Messgeräte
Zu Beginn wurde ein PH-Sensor-Modul verwendet. Dieses erwies sich allerdings nach vielem Testen als fehlerhaft. Der Fehler bestand darin, dass das Gerät nur einen Wert dauerhaft ausgegeben hat. Da weiterhin keine Benutzeranleitung mitgeliefert wurde und diese online nur auf chinesich und für bauähnliche Geräte gefunden werden konnte, war es nicht möglich, dieses PH-Sensor-Modul weiter zu verwenden.

## 7.3 Librarys
Bei dem Arduino BLE 33 Sense wurde festgestellt, dass für das vorherige Projektziel leider keine Kompatibilität zu den Libraries bestand. Als Resultat wurden durch die inkompatiblen Libraries die USB-Schnittstelle überschrieben, wodurch der Arduino jeweils die Kommunikation mit dem PC verloren hatte. Dadurch konnten diese Arduinos nicht mehr ohne weiteres verwendet werden.

## 7.4 Dateiformate und -übertragung
Für die Integration der vom Arduino erfassten Sensordaten in die Webanwendung waren verschiedene Aspekte zu berücksichtigen, darunter der Übertragungsweg und das Datenformat. Eine anfängliche Idee bestand darin, die Daten an einen Server zu senden, z. B. einen lokalen Express-Server von *Node.js*. Allerdings stellte sich die Umsetzung dieser Lösung als schwierig heraus. Die Applikation wurde ebenso über den lokalen Server gehostet, das Grundgerüst der Navigierung zwischen den verschiedenen Ansichten und der Datenübertragung innerhalb der Applikation erfolgte über Funktionen des Pakets *react-router-dom*, welche nicht mehr nutzbar waren, da sie über URLs ihre Funktionalität erfüllt hatten. Da der Server selbst über URLs arbeitete, beispielsweise für POST- oder GET-Anfragen, konnte er die Navigation-URLs nicht auflösen. Angesichts der begrenzten verfügbaren Zeit wurde daher eine alternative Lösung in Betracht gezogen.

Da die Datenübertragung auch über eine kabelgebundene Verbindung wie einem USB-Kabel erfolgen kann, das mit einem Laptop verbunden ist, können die Daten in entsprechenden Programmen verwendet werden. Gängige Software dafür sind beispielsweise die Arduino IDE[^18] oder PuTTY[^19].

Des Weiteren mussten die Daten zu den idealen PH-Werten von der Website in einem Format vorliegen, das von der Webanwendung verarbeitet werden kann. Eine Möglichkeit bestand darin, eine kleine Datenbank einzurichten, aus der die Daten abgefragt werden könnten. Die Datenmenge ist jedoch relativ gering und es werden keine großen Veränderungen oder Erweiterungen erwartet, da alle gängigen Pflanzenarten enthalten sind, die für Hobbygärtner, für die diese Anwendung entwickelt wurde, relevant sein könnten. Somit wurde entschieden, die Daten in einer JSON-Datei abzulegen, die von der React-Applikation ohne großen Aufwand genutzt werden kann. Die Konvertierung der Tabellendaten in ein geeignetes Format wie CSV und schließlich in eine gewünschte JSON-Dateistruktur stellte jedoch eine unerwartete Hürde dar, die mehrere Stunden Arbeit erforderte, um sie zu überwinden.

# 8 Lessons Learned
Eine vorab Prüfung der Libraries, Kompatibilität der Hardware mit der Software und der Hardware selbst ist zwingend notwendig, um Komplikationen zu vermeiden. Außerdem sollten je nach Projektzeitraum auch auf die besorgte Hardware geschaut werden. Hardware ohne Benutzeranleitung bzw. eine welche verwendet werden kann, sollte ausgeschlossen werden. Es ist jedoch zu beachten, dass auch wenn das ursprüngliche Projekt nicht umsetzbar war, es mit dem Arduino möglich war, mittels eines anderen Weges ein ähnliches Ergebnis zu erzielen.

# 9 Fazit & Ausblick
Im Zuge dieses Projekts wurde ein funtkionstüchtiger Prototyp einer Anwendung zur Messung von PH-Werten für Pflanzenboden und Auswertung dieser Daten entwickelt. Mit diesem können (Hobby-)Gärtner prüfen, ob der jeweilige Boden für ihre Pflanze ideal ist und ggf. Handlungsemfehlungen erhalten, falls dies nicht der Fall ist. Die Applikation ist bspw. besonders für Menschen mit Farbschwäche interessant, die bei gängigen PH-Streifen Schwierigkeiten bei der korrekten Erkennung der vorliegenden Farben haben könnten. 

Der wichtigste nächste Schritt für die Umsetzung des ursprünglichen Projektziels besteht darin, eine vollständige und korrekte Implementierung des PH-Messgeräts zu erreichen. Da der Erfolg dieses Vorhabens jedoch von der fehlerfreien Funktionsweise des PH-Sensors abhängt, ist nur begrenzt Einfluss auf den Erfolg möglich.

In einer idealen Anwendung könnten zusätzlich zu den Überprüfungen der aktuellen PH-Messwerte auch vergangene Messwerte gespeichert werden, um einen Verlauf einsehbar zu machen. Darüber hinaus könnte eine Funktion implementiert werden, um eigene Pflanzenprofile zu speichern, möglicherweise inklusive eigener aufgenommener Bilder. Das Hosting der Anwendung ermöglicht es verschiedenen Personen, sie zu nutzen und innerhalb der Community Wissen auszutauschen, beispielsweise durch die Integration von Forum-Funktionen. Dies wäre eine positive Weiterentwicklung der Anwendung. 

# Quellen

[^1]: ECENSE-Store (2018, 27. März). *ECENCE pH Teststreifen 100 Stck, Lackmus Testpapier, Messbereich 4,5-9, Indikator Universalpapier, Säuretest für Aquarien, Trinkwasser.* URL: https://www.amazon.de/dp/B07CCZSV6C/ref=twister_B095SV65FG?_encoding=UTF8&psc=1 (abgerufen am 24.06.2023)

[^2]: Pajak, D. & Mistry, S. (2021, 03. Mai). *FruitToEmoji.* URL: https://github.com/arduino/ArduinoTensorFlowLiteTutorials/tree/master/FruitToEmoji (abgerufen am 16.07.2023)

[^3]: Jeske, E. (2023, 17. April). *pH-Wert Pflanzen-Tabelle: Der richtige Boden für deine Pflanze.* URL: https://liebe-zum-garten.de/ph-wert-pflanzen-tabelle/ (abgerufen am 12.06.2023)

[^4]: Kumar, P. (2022, 22. Januar). *Convert CSV to JSON Using Python – A Beginner’s Guide.* URL: https://www.askpython.com/python/examples/convert-csv-to-json (abgerufen am 18.06.2023)

[^5]: OpenAI (2023, 03. Juli). Abwandlung der Antwort auf die Frage: *Wie könnte ein Python Programm aussehen, dass auf COM10 hört und alle Daten, die dort eingehen, über einen Websocket Server abrufbrar macht.*

[^6]: Pajak, D. & Mistry, S. (2019, 07. November). *FruitToEmoji-GIT.ipynb.* URL: https://colab.research.google.com/github/arduino/ArduinoTensorFlowLiteTutorials/blob/master/FruitToEmoji/FruitToEmoji.ipynb (abgerufen 16.07.2023)

[^7]: Tensorflow (o. D.). *Keras: The high-level API for TensorFlow.* URL: https://www.tensorflow.org/guide/keras (16.07.2023)

[^8]: PrimeReact (o. D.). *Button.* URL: https://primereact.org/button/ (abgerufen am 19.06.2023)

[^9]: PrimeReact (o. D.). *Card.* URL: https://primereact.org/card/ (abgerufen am 26.06.2023)

[^10]: PrimeReact (o. D.). *DataTable.* URL: https://primereact.org/datatable/ (abgerufen am 19.06.2023)

[^11]: PrimeReact (o. D.). *DropDown.* URL: https://primereact.org/dropdown/ (abgerufen am 19.06.2023

[^12]: PrimeReact (o. D.). *Menu.* URL: https://primereact.org/menu/ (abgerufen am 19.06.2023)

[^13]: PrimeReact (o. D.). *ProgressSpinner.* URL: https://primereact.org/progressspinner/ (abgerufen am 03.07.2023) 

[^14]: PrimeReact (o. D.). *SideBar.* URL: https://primereact.org/sidebar/ (abgerufen am 19.06.2023)

[^15]: React Router (o. D.). *useNavigate.* URL: https://reactrouter.com/en/main/hooks/use-navigate (abgerufen am 26.06.2023)

[^16]: React Router (o. D.). *useLocation.* URL: https://reactrouter.com/en/main/hooks/use-location (abgerufen am 26.06.2023)

[^17]: GartenFlora (o. D.). *pH-Wert im Gartenboden: Prüfen und regulieren.* URL: https://www.gartenflora.de/gartenwissen/gartenpflege/ph-wert-gartenboden-pruefen/#:~:text=Ist%20der%20pH%2DWert%20im%20Bodensubstrat%20generell%20zu%20hoch%20(im,schlimmsten%20Fall%20sterben%20Pflanzen%20ab. (abgerufen 19.06.2023)

[^18]: Arduino (o. D.). *SerialTransfer.* URL: https://www.arduino.cc/reference/en/libraries/serialtransfer/ (abgerufen am 03.07.2023)

[^19]: Mechatrofice (o. D.). *Save Serial data to a text file – Arduino, Processing, PuTTY.* URL: https://mechatrofice.com/arduino/save-serial-data-to-a-text-file-arduino-processing-putty (abgerufen am 03.07.2023)
