import {useState} from 'react';
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const Pflanzen_Auswahl = () => {

        const navigate = useNavigate();
        const [selectedPflanze, setSelectedPflanze] = useState("");
        const PflanzenAuswahl =
            [
                {
                    label: "Kräuter", items: [
                        {label: 'Basilikum', value: 'Basilikum'},
                        {label: 'Dill', value: 'Dill'},
                        {label: 'Majoran', value: 'Majoran'},
                        {label: 'Oregano', value: 'Oregano'},
                        {label: 'Petersilie', value: 'Petersilie'},
                        {label: 'Pfefferminze', value: 'Pfefferminze'},
                        {label: 'Rosmarin', value: 'Rosmarin'},
                        {label: 'Salbei', value: 'Salbei'},
                        {label: 'Thymian', value: 'Thymian'},
                    ]
                },
                {
                    label: "Gemüse", items: [
                        {label: 'Artischocke', value: 'Artischocke'},
                        {label: 'Aubergine', value: 'Aubergine'},
                        {label: 'Blumenkohl', value: 'Blumenkohl'},
                        {label: 'Bohnen', value: 'Bohnen'},
                        {label: 'Brokkoli', value: 'Brokkoli'},
                        {label: 'Brunnenkresse', value: 'Brunnenkresse'},
                        {label: 'Chicoree', value: 'Chicoree'},
                        {label: 'Chili (Peperoni)', value: 'Chili (Peperoni)'},
                        {label: 'Chinakohl', value: 'Chinakohl'},
                        {label: 'Endivien', value: 'Endivien'},
                        {label: 'Erbsen', value: 'Erbsen'},
                        {label: 'Feldsalat', value: 'Feldsalat'},
                        {label: 'Fenchel', value: 'Fenchel'},
                        {label: 'Grünkohl', value: 'Grünkohl'},
                        {label: 'Gurken', value: 'Gurken'},
                        {label: 'Ingwer', value: 'Ingwer'},
                        {label: 'Kartoffeln', value: 'Kartoffeln'},
                        {label: 'Knoblauch', value: 'Knoblauch'},
                        {label: 'Kohlrabi', value: 'Kohlrabi'},
                        {label: 'Kopfsalat', value: 'Kopfsalat'},
                        {label: 'Kürbis', value: 'Kürbis'},
                        {label: 'Kresse', value: 'Kresse'},
                        {label: 'Mais', value: 'Mais'},
                        {label: 'Mangold', value: 'Mangold'},
                        {label: 'Möhren', value: 'Möhren'},
                        {label: 'Pak Choi', value: 'Pak Choi'},
                        {label: 'Paprika', value: 'Paprika'},
                        {label: 'Porree', value: 'Porree'},
                        {label: 'Radicchio', value: 'Radicchio'},
                        {label: 'Radieschen & Rettich', value: 'Radieschen & Rettich'},
                        {label: 'Rosenkohl', value: 'Rosenkohl'},
                        {label: 'Rote Bete', value: 'Rote Bete'},
                        {label: 'Schalotten', value: 'Schalotten'},
                        {label: 'Schnittlauch', value: 'Schnittlauch'},
                        {label: 'Schwarzwurzeln', value: 'Schwarzwurzeln'},
                        {label: 'Spargel', value: 'Spargel'},
                        {label: 'Spinat', value: 'Spinat'},
                        {label: 'Sellerie', value: 'Sellerie'},
                        {label: 'Steckrübe', value: 'Steckrübe'},
                        {label: 'Süßkartoffel', value: 'Süßkartoffel'},
                        {label: 'Tomaten', value: 'Tomaten'},
                        {label: 'Weißkohl, Rotkohl & Wirsing', value: 'Weißkohl, Rotkohl & Wirsing'},
                        {label: 'Winterrettich', value: 'Winterrettich'},
                        {label: 'Zucchini', value: 'Zucchini'},
                        {label: 'Zwiebeln', value: 'Zwiebeln'},
                    ]
                },
                {
                    label: "Obst", items: [
                        {label: 'Äpfel', value: 'Äpfel'},
                        {label: 'Aprikosen', value: 'Aprikosen'},
                        {label: 'Birnen', value: 'Birnen'},
                        {label: 'Erdbeeren', value: 'Erdbeeren'},
                        {label: 'Heidelbeeren und Preiselbeeren', value: 'Heidelbeeren und Preiselbeeren'},
                        {label: 'Himbeeren & Brombeeren', value: 'Himbeeren & Brombeeren'},
                        {label: 'Blaubeere', value: 'Blaubeere'},
                        {label: 'Johannisbeeren (schwarz & weiß)', value: 'Johannisbeeren (schwarz & weiß)'},
                        {label: 'Johannisbeeren rot', value: 'Johannisbeeren rot'},
                        {label: 'Pfirsich', value: 'Pfirsich'},
                        {label: 'Pflaumen', value: 'Pflaumen'},
                        {label: 'Rhabarber', value: 'Rhabarber'},
                        {label: 'Sauerkirschen', value: 'Sauerkirschen'},
                        {label: 'Stachelbeere amerikanisch', value: 'Stachelbeere amerikanisch'},
                        {label: 'Stachelbeere europäisch', value: 'Stachelbeere europäisch'},
                        {label: 'Süßkirschen', value: 'Süßkirschen'},
                        {label: 'Quitten', value: 'Quitten'},
                        {label: 'Weinreben', value: 'Weinreben'},
                    ]
                },
                {
                    label: "Nüsse", items: [
                        {label: 'Haselnuss', value: 'Haselnuss'},
                        {label: 'Walnuss', value: 'Walnuss'},
                    ]
                },
                {
                    label: "Nadelgehölze", items: [
                        {label: 'Eiben', value: 'Eiben'},
                        {label: 'Fichten & Tannen', value: 'Fichten & Tannen'},
                        {label: 'Kiefer & Lärchen', value: 'Kiefer & Lärchen'},
                        {label: 'Lebensbäume (Thuja)', value: 'Lebensbäume (Thuja)'},
                        {label: 'Wacholder', value: 'Wacholder'},
                        {label: 'Weymouthskiefer', value: 'Weymouthskiefer'},
                        {label: 'Zeder weiß', value: 'Zeder weiß'},
                        {label: 'Zeder virginisch', value: 'Zeder virginisch'},
                        {label: 'Zypressen', value: 'Zypressen'},
                    ]
                },
                {
                    label: "Laubgehölze", items: [
                        {label: 'Ahorn', value: 'Ahorn'},
                        {label: 'Birke', value: 'Birke'},
                        {label: 'Buche', value: 'Buche'},
                        {label: 'Eiche', value: 'Eiche'},
                        {label: 'Flieder', value: 'Flieder'},
                        {label: 'Forsythie', value: 'Forsythie'},
                        {label: 'Kastanie', value: 'Kastanie'},
                        {label: 'Liguster', value: 'Liguster'},
                        {label: 'Linde', value: 'Linde'},
                        {label: 'Magnolie', value: 'Magnolie'},
                        {label: 'Pappel', value: 'Pappel'},
                        {label: 'Platane', value: 'Platane'},
                        {label: 'Robinie', value: 'Robinie'},
                        {label: 'Rose', value: 'Rose'},
                        {label: 'Trauerweide', value: 'Trauerweide'},
                        {label: 'Weide', value: 'Weide'},
                    ]
                },
                {
                    label: "Zierpflanzen & Blumen", items: [
                        {label: 'Abelien', value: 'Abelien'},
                        {label: 'Akazie', value: 'Akazie'},
                        {label: 'Adonisröschen', value: 'Adonisröschen'},
                        {label: 'Akelei', value: 'Akelei'},
                        {label: 'Alpenveilchen', value: 'Alpenveilchen'},
                        {label: 'Alpen-Edelweiß', value: 'Alpen-Edelweiß'},
                        {label: 'Amaryllis', value: 'Amaryllis'},
                        {label: 'Amerikanische Pampasgras', value: 'Amerikanische Pampasgras'},
                        {label: 'Anemonen', value: 'Anemonen'},
                        {label: 'Arnika', value: 'Arnika'},
                        {label: 'Astern', value: 'Astern'},
                        {label: 'Azaleen', value: 'Azaleen'},
                        {label: 'Ballonblume', value: 'Ballonblume'},
                        {label: 'Begonien', value: 'Begonien'},
                        {label: 'Bergenien', value: 'Bergenien'},
                        {label: 'Berglorbeer', value: 'Berglorbeer'},
                        {label: 'Besenheide', value: 'Besenheide'},
                        {label: 'Blaukissen', value: 'Blaukissen'},
                        {label: 'Blausterne', value: 'Blausterne'},
                        {label: 'Bleiwurz', value: 'Bleiwurz'},
                        {label: 'Bougainvillea', value: 'Bougainvillea'},
                        {label: 'Brandschopf', value: 'Brandschopf'},
                        {label: 'Braunellen', value: 'Braunellen'},
                        {label: 'Bromelien', value: 'Bromelien'},
                        {label: 'Bubikopf', value: 'Bubikopf'},
                        {label: 'Buchsbaum', value: 'Buchsbaum'},
                        {label: 'Christusdorn', value: 'Christusdorn'},
                        {label: 'Chrysantheme', value: 'Chrysantheme'},
                        {label: 'Cineraria', value: 'Cineraria'},
                        {label: 'Cistus', value: 'Cistus'},
                        {label: 'Clarkia', value: 'Clarkia'},
                        {label: 'Coleus', value: 'Coleus'},
                        {label: 'Convolvulus', value: 'Convolvulus'},
                        {label: 'Chrysanthemen', value: 'Chrysanthemen'},
                        {label: 'Clematis', value: 'Clematis'},
                        {label: 'Dahlien', value: 'Dahlien'},
                        {label: 'Dreimasterblumen', value: 'Dreimasterblumen'},
                        {label: 'Ehrenpreis', value: 'Ehrenpreis'},
                        {label: 'Efeu', value: 'Efeu'},
                        {label: 'Eibisch', value: 'Eibisch'},
                        {label: 'Europäische Pfeifenstrauch', value: 'Europäische Pfeifenstrauch'},
                        {label: 'Erika', value: 'Erika'},
                        {label: 'Farne', value: 'Farne'},
                        {label: 'Fetthennen', value: 'Fetthennen'},
                        {label: 'Fingerhirse', value: 'Fingerhirse'},
                        {label: 'Flamingoblumen', value: 'Flamingoblumen'},
                        {label: 'Flammenblumen', value: 'Flammenblumen'},
                        {label: 'Fleißige Lieschen', value: 'Fleißige Lieschen'},
                        {label: 'Flockenblumen', value: 'Flockenblumen'},
                        {label: 'Forsythien', value: 'Forsythien'},
                        {label: 'Fuchsien', value: 'Fuchsien'},
                        {label: 'Gardenien', value: 'Gardenien'},
                        {label: 'Gazanien', value: 'Gazanien'},
                        {label: 'Gänseblümchen', value: 'Gänseblümchen'},
                        {label: 'Geranien', value: 'Geranien'},
                        {label: 'Ginster', value: 'Ginster'},
                        {label: 'Gipskräuter', value: 'Gipskräuter'},
                        {label: 'Glockenblumen', value: 'Glockenblumen'},
                        {label: 'Goldregen', value: 'Goldregen'},
                        {label: 'Goldruten', value: 'Goldruten'},
                        {label: 'Grüne Minze', value: 'Grüne Minze'},
                        {label: 'Günsel', value: 'Günsel'},
                        {label: 'Gladiolen', value: 'Gladiolen'},
                        {label: 'Heidekraut', value: 'Heidekraut'},
                        {label: 'Hibiskus', value: 'Hibiskus'},
                        {label: 'Hornkräuter', value: 'Hornkräuter'},
                        {label: 'Hortensien', value: 'Hortensien'},
                        {label: 'Hyazinthen', value: 'Hyazinthen'},
                        {label: 'Iris', value: 'Iris'},
                        {label: 'Jasmin', value: 'Jasmin'},
                        {label: 'Kamelie', value: 'Kamelie'},
                        {label: 'Klivie', value: 'Klivie'},
                        {label: 'Kokardenblumen', value: 'Kokardenblumen'},
                        {label: 'Kornblumen', value: 'Kornblumen'},
                        {label: 'Köcherblümchen', value: 'Köcherblümchen'},
                        {label: 'Krokusse', value: 'Krokusse'},
                        {label: 'Lilien', value: 'Lilien'},
                        {label: 'Löwenmäulchen', value: 'Löwenmäulchen'},
                        {label: 'Lupinen', value: 'Lupinen'},
                        {label: 'Maiglöckchen', value: 'Maiglöckchen'},
                        {label: 'Moos', value: 'Moos'},
                        {label: 'Narzissen', value: 'Narzissen'},
                        {label: 'Nelken', value: 'Nelken'},
                        {label: 'Nieswurz', value: 'Nieswurz'},
                        {label: 'Ochsenzungen', value: 'Ochsenzungen'},
                        {label: 'Oleander', value: 'Oleander'},
                        {label: 'Orchideen', value: 'Orchideen'},
                        {label: 'Osterglocken', value: 'Osterglocken'},
                        {label: 'Osterlilien', value: 'Osterlilien'},
                        {label: 'Pantoffelblumen', value: 'Pantoffelblumen'},
                        {label: 'Passionsblumen', value: 'Passionsblumen'},
                        {label: 'Petunien', value: 'Petunien'},
                        {label: 'Pfingstrosen', value: 'Pfingstrosen'},
                        {label: 'Prärielilien', value: 'Prärielilien'},
                        {label: 'Primeln', value: 'Primeln'},
                        {label: 'Quitte', value: 'Quitte'},
                        {label: 'Rhododendron', value: 'Rhododendron'},
                        {label: 'Ringelblume', value: 'Ringelblume'},
                        {label: 'Raps', value: 'Raps'},
                        {label: 'Rittersporn', value: 'Rittersporn'},
                        {label: 'Rosen', value: 'Rosen'},
                        {label: 'Schleifenblumen', value: 'Schleifenblumen'},
                        {label: 'Schneeglöckchen', value: 'Schneeglöckchen'},
                        {label: 'Schwertlilien', value: 'Schwertlilien'},
                        {label: 'Sonnenblumen', value: 'Sonnenblumen'},
                        {label: 'Sonnenwenden', value: 'Sonnenwenden'},
                        {label: 'Steinbrech', value: 'Steinbrech'},
                        {label: 'Steckrosen', value: 'Steckrosen'},
                        {label: 'Stiefmütterchen', value: 'Stiefmütterchen'},
                        {label: 'Strauchmargerite', value: 'Strauchmargerite'},
                        {label: 'Studentenblume', value: 'Studentenblume'},
                        {label: 'Sukkulenten', value: 'Sukkulenten'},
                        {label: 'Tamarisken', value: 'Tamarisken'},
                        {label: 'Tränendes Herz', value: 'Tränendes Herz'},
                        {label: 'Tulpen', value: 'Tulpen'},
                        {label: 'Usambaraveilchen', value: 'Usambaraveilchen'},
                        {label: 'Veilchen', value: 'Veilchen'},
                        {label: 'Vergißmeinnicht', value: 'Vergißmeinnicht'},
                        {label: 'Wachsblume', value: 'Wachsblume'},
                        {label: 'Waldmeister', value: 'Waldmeister'},
                        {label: 'Weihnachtskaktus', value: 'Weihnachtskaktus'},
                        {label: 'Zierspargel', value: 'Zierspargel'},
                        {label: 'Zinnien', value: 'Zinnien'},
                    ]
                },
            ]


        return (
            <div>
                <div className="flex flex-column card-container green-container row-gap-3 text-justify">
                    Hier kannst du überprüfen, ob der gemessene PH-Wert deines Bodens ideal für deine Pflanze ist.
                    Wähle dazu deine vorliegende Pflanze aus, halte den PH-Streifen über den Farbsensor in dre Mitte des
                    Arduinos und drücke auf "auswählen".
                    <Dropdown value={selectedPflanze} onChange={(e) => setSelectedPflanze(e.value)}
                              options={PflanzenAuswahl}
                              optionLabel="label"
                              optionGroupLabel="label" optionGroupChildren="items"
                              className="flex align-items-center justify-content-center"
                              placeholder="Wählen Sie eine Pflanze aus"/>

                    <Button label="auswählen"
                            on="pi pi-check" iconPos="right"
                            className="align-self-center"
                            onClick={() => navigate("/ansicht", {
                                state: {
                                    name: selectedPflanze
                                }
                            })}/>
                </div>
            </div>)
    };

export default Pflanzen_Auswahl;
